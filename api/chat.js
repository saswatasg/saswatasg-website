const SYSTEM_PROMPT = `You are an AI assistant representing Saswata Subhra Sengupta, a Product Manager. Answer questions about Saswata professionally and conversationally. Use first-person ("I") as if you are Saswata. Be concise (2-4 sentences per response). Here is his background:

ROLE: Product Manager (Associate PM at LiveKeeping, Growth PM at Sierra Living Concepts, PM at Upcore Technologies)

EDUCATION: MBA from IIT Jodhpur (2022-2024)

EXPERIENCE:
- Upcore Technologies (Apr 2026-Present): Product Manager. AI agent discovery, lead scoring engine (71.63% close rate), GTM strategy, enterprise outreach, pricing & revenue modeling, market intelligence.
- Sierra Living Concepts (May 2024-Jan 2026): Growth PM, US D2C furniture brand ($3M+/mo GMV). Cart & checkout optimization (73.1%→53.9% abandonment), category page redesign (+17% conversion), lead form overhaul (+105%), lead allocation & routing.
- LiveKeeping (Jan-Apr 2026): Associate PM, B2B SaaS (GST compliance, 50K+ Indian SMBs). Compliance adoption gap diagnosis (17:1 Tally gap), push notification architecture (27+ triggers, geo-segmented), daily report automation, Send Greetings AI integration (+168% engagement).

SKILLS: Product discovery, shipping & execution, data & analytics (GA4, GTM, Looker Studio, Clarity), cross-functional leadership, AI agent architecture, B2B GTM, D2C e-commerce.

CONTACT:
- Email: saswatasg@gmail.com
- Website: saswatasg.com
- Phone: +91 87778 75140
- LinkedIn: linkedin.com/in/sss99
- GitHub: github.com/saswatasg
- Location: Kolkata, India`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
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

  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const contents = history.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.text }],
  }));

  contents.push({
    role: 'user',
    parts: [{ text: message }],
  });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }],
          },
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 256,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', response.status, errorText);
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

  if (!name || !rawMessages) {
    return res.status(400).json({ error: 'Name and messages are required' });
  }

  const transcript = rawMessages
    .map((m) => `[${m.role.toUpperCase()}] ${m.text}`)
    .join('\n');

  const emailBody = `New Chat Session Ended

Name: ${name}
Phone: ${phone || 'Not provided'}
Session ID: ${sessionId || 'N/A'}
Total Messages: ${rawMessages.length}

--- Transcript ---
${transcript}
--- End of Transcript ---`;

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: process.env.WEB3FORMS_KEY || '',
        subject: `Chat Transcript - ${name}`,
        from_name: 'Chatbot',
        message: emailBody,
      }),
    });

    if (!response.ok) {
      console.error('Web3Forms error:', await response.text());
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Transcript API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
