const SYSTEM_PROMPT = `You are an AI assistant representing Saswata Subhra Sengupta, a Product Manager. Answer questions about Saswata professionally and conversationally. Use first-person ("I") as if you are Saswata. Be concise (2-4 sentences per response). Here is his background:

ROLE: Product Manager (Associate PM at LiveKeeping, Growth PM at Sierra Living Concepts, PM at Upcore Technologies)

EDUCATION: MBA from IIT Jodhpur (2022-2024); B.Tech in Mechanical Engineering from Jalpaiguri Government Engineering College (2017-2021)

EXPERIENCE:
- Upcore Technologies (Apr 2026-Present): Product Manager. AI agent discovery, lead scoring engine (71.63% close rate), GTM strategy, enterprise outreach, pricing & revenue modeling, market intelligence.
- Sierra Living Concepts (May 2024-Jan 2026): Growth PM, US D2C furniture brand ($3M+/mo GMV). Cart & checkout optimization (73.1%→53.9% abandonment), category page redesign (+17% conversion), lead form overhaul (+105%), lead allocation & routing.
- LiveKeeping (Jan-Apr 2026): Associate PM, B2B SaaS (GST compliance, 50K+ Indian SMBs). Compliance adoption gap diagnosis (17:1 Tally gap), push notification architecture (27+ triggers, geo-segmented), daily report automation, Send Greetings AI integration (+168% engagement).

SKILLS: Product discovery, shipping & execution, data & analytics (GA4, GTM, Looker Studio, Clarity), cross-functional leadership, AI agent architecture, B2B GTM, D2C e-commerce.

BLOG: I publish deep-dive posts on AI agents in production, e-commerce CRO, and AI-era product management at saswatasg.com/blog. If the user asks about case studies, agent architecture, or what I've shipped, suggest reading the blog.

CONTACT:
- Email: saswatasg@gmail.com
- Website: saswatasg.com
- Phone: +91 9836312162
- LinkedIn: linkedin.com/in/sss99
- GitHub: github.com/saswatasg
- Location: Kolkata, India`;

const rateMap = new Map();
function isRateLimited(req, limit = 10, windowMs = 60_000) {
  const ip = (req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.headers['x-real-ip'] || 'unknown');
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + windowMs });
    return false;
  }
  entry.count += 1;
  return entry.count > limit;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const bodyStr = JSON.stringify(req.body || {});
  if (bodyStr.length > 8192) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  if (isRateLimited(req)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }

  const { action } = req.body;

  if (action === 'end') {
    return handleEnd(req, res);
  }

  return handleChat(req, res);
}

async function handleChat(req, res) {
  const { message, history = [] } = req.body;

  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message is required' });
  }
  if (message.length > 2000) {
    return res.status(400).json({ error: 'Message too long (max 2000 chars)' });
  }
  if (!Array.isArray(history)) {
    return res.status(400).json({ error: 'Invalid history' });
  }

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // Cap history: last 6, each text 2KB, total 8KB
  const cappedHistory = history.slice(-6).map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: String(msg.text || '').slice(0, 2000) }],
  }));
  const totalChars = cappedHistory.reduce((acc, m) => acc + (m.parts[0].text.length || 0), 0) + message.length;
  if (totalChars > 8000) {
    return res.status(400).json({ error: 'History too large' });
  }

  const contents = [...cappedHistory, { role: 'user', parts: [{ text: message.slice(0, 2000) }] }];

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          generationConfig: { temperature: 0.7, maxOutputTokens: 256 },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText.slice(0, 500));
      return res.status(502).json({ error: 'AI service error' });
    }

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';

    return res.status(200).json({ reply });
  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function handleEnd(req, res) {
  const { name, phone, messages: rawMessages, sessionId } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
    return res.status(400).json({ error: 'Name is required (max 100 chars)' });
  }
  if (!Array.isArray(rawMessages) || rawMessages.length === 0 || rawMessages.length > 50) {
    return res.status(400).json({ error: 'Messages array required (max 50)' });
  }
  if (phone && (typeof phone !== 'string' || phone.length > 20)) {
    return res.status(400).json({ error: 'Invalid phone' });
  }

  const transcript = rawMessages
    .slice(-50)
    .map((m) => `[${String(m.role || 'unknown').toUpperCase().slice(0, 20)}] ${String(m.text || '').slice(0, 2000)}`)
    .join('\n')
    .slice(0, 8000);

  const emailBody = `New Chat Session Ended

Name: ${String(name).slice(0, 100)}
Phone: ${phone ? String(phone).slice(0, 20) : 'Not provided'}
Session ID: ${String(sessionId || 'N/A').slice(0, 100)}
Total Messages: ${rawMessages.length}

--- Transcript ---
${transcript}
--- End of Transcript ---`;

  try {
    const response = await fetch('https://formsubmit.co/ajax/saswatasg@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _subject: `Chat Transcript - ${String(name).slice(0, 50)}`,
        _template: 'table',
        _captcha: 'false',
        name: String(name).slice(0, 100),
        phone: phone ? String(phone).slice(0, 20) : 'Not provided',
        session_id: String(sessionId || 'N/A').slice(0, 100),
        message: emailBody.slice(0, 8000),
      }),
    });

    if (!response.ok) {
      console.error('FormSubmit error:', (await response.text()).slice(0, 500));
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Transcript API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
