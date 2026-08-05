import React, { useState, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart, Upload, FileText, Sparkles, Download, RotateCcw,
  AlertTriangle, Loader2, ShieldCheck, ArrowRight, Users,
} from 'lucide-react';
import PageMeta from '@/components/PageMeta';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import PillChoice from '@/components/wa-magazine/PillChoice';
import TagListInput from '@/components/wa-magazine/TagListInput';
import { trackEvent } from '@/utils/analytics';

const API_URL = import.meta.env.VITE_WA_MAGAZINE_API_URL || '';

const DESIGN_STYLES = [
  { value: 'blush_editorial', label: 'Blush Editorial', sub: 'Warm, romantic' },
  { value: 'midnight_romance', label: 'Midnight Romance', sub: 'Dark, gold accents' },
  { value: 'botanical_warm', label: 'Botanical Warm', sub: 'Earthy, natural' },
  { value: 'modern_mono', label: 'Modern Mono', sub: 'Black & white, bold' },
];
const RELATIONSHIP_TYPES = [
  { value: 'partners', label: 'Partners' },
  { value: 'friends', label: 'Friends' },
  { value: 'family', label: 'Family' },
  { value: 'long_distance', label: 'Long Distance' },
];
const EMOTIONAL_TONES = [
  { value: 'celebratory', label: 'Celebratory' },
  { value: 'balanced', label: 'Balanced' },
  { value: 'full_honesty', label: 'Full Honesty' },
];
const LENGTHS = [
  { value: 'short', label: 'Short', sub: '~5 pages' },
  { value: 'full', label: 'Full', sub: '~8 pages' },
  { value: 'deep_dive', label: 'Deep Dive', sub: '~12 pages' },
];

const initialConfig = {
  design_style: 'blush_editorial',
  relationship_type: 'partners',
  emotional_tone: 'balanced',
  length: 'full',
  meeting_pattern: '',
  call_habits: '',
  extra_context: '',
  known_nicknames: [],
  known_places: [],
};

const Card = ({ children, className = '', shadow = '#0A0A0A' }) => (
  <div
    className={`bg-white border-2 border-black rounded-2xl ${className}`}
    style={{ boxShadow: `6px 6px 0px 0px ${shadow}` }}
  >
    {children}
  </div>
);

const OffsetButton = ({ children, onClick, type = 'button', disabled, bg = 'bg-ink', textColor = 'text-white', shadowBg = 'bg-coral', className = '' }) => (
  <div className={`relative inline-flex group ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
    <div className={`absolute inset-0 rounded-lg border-2 border-black ${shadowBg} translate-x-[3px] translate-y-[3px]`} />
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative z-10 ${bg} ${textColor} rounded-lg border-2 border-black px-5 py-2.5 min-h-[44px] text-sm font-bold inline-flex items-center gap-2 transition-transform duration-150 group-hover:translate-x-[3px] group-hover:translate-y-[3px] ${className}`}
    >
      {children}
    </button>
  </div>
);

const RelationshipMagazine = () => {
  const [step, setStep] = useState('upload'); // upload | confirm | form | generating | done | error
  const [chatFile, setChatFile] = useState(null);
  const [detected, setDetected] = useState(null);
  const [config, setConfig] = useState(initialConfig);
  const [errorMessage, setErrorMessage] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const accessCode = useMemo(() => new URLSearchParams(window.location.search).get('code') || '', []);

  const authHeaders = useCallback(
    () => (accessCode ? { 'X-Access-Code': accessCode } : {}),
    [accessCode]
  );

  const setField = (key, value) => setConfig((c) => ({ ...c, [key]: value }));

  const detectParticipants = async (file) => {
    setErrorMessage('');
    setStep('confirm');
    try {
      const fd = new FormData();
      fd.append('chat_file', file);
      const res = await fetch(`${API_URL}/detect-participants`, { method: 'POST', body: fd, headers: authHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Could not read that file.');
      setDetected(data);
      trackEvent('wa_magazine', 'file_parsed', undefined, data.total_messages);
    } catch (e) {
      setErrorMessage(e.message || 'Something went wrong reading that file.');
      setStep('error');
    }
  };

  const handleFile = (file) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith('.txt')) {
      setErrorMessage('Please upload the WhatsApp .txt export (not the .zip - unzip it first and pick the .txt file inside).');
      setStep('error');
      return;
    }
    setChatFile(file);
    trackEvent('wa_magazine', 'file_selected');
    detectParticipants(file);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const reset = () => {
    setStep('upload');
    setChatFile(null);
    setDetected(null);
    setConfig(initialConfig);
    setErrorMessage('');
    if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    setPdfUrl('');
  };

  const generate = async () => {
    setStep('generating');
    setErrorMessage('');
    trackEvent('wa_magazine', 'generate_start', config.design_style);
    try {
      const fd = new FormData();
      fd.append('chat_file', chatFile);
      fd.append('answers', JSON.stringify(config));
      const res = await fetch(`${API_URL}/generate`, { method: 'POST', body: fd, headers: authHeaders() });
      if (!res.ok) {
        let detail = 'Magazine generation failed.';
        try { detail = (await res.json()).detail || detail; } catch { /* non-JSON error body */ }
        throw new Error(detail);
      }
      const blob = await res.blob();
      setPdfUrl(URL.createObjectURL(blob));
      setStep('done');
      trackEvent('wa_magazine', 'generate_success');
    } catch (e) {
      setErrorMessage(e.message || 'Something went wrong generating the magazine.');
      setStep('error');
      trackEvent('wa_magazine', 'generate_failed');
    }
  };

  if (!API_URL) {
    return (
      <div className="max-w-2xl mx-auto px-4 pt-32 pb-16 text-center">
        <PageMeta title="Lab" description="Internal tool." noindex={true} />
        <p className="text-sm font-bold text-ink/60">
          This tool's backend isn't configured (missing <code>VITE_WA_MAGAZINE_API_URL</code>).
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-16">
      <PageMeta
        title="Relationship Magazine — Private Lab Tool"
        description="An unlisted personal tool. Not indexed, not linked anywhere on the site."
        noindex={true}
      />

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center mb-8">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink text-white text-xs font-bold border-2 border-black mb-3">
          <Sparkles className="w-3 h-3 text-coral" />
          Private lab tool
        </span>
        <h1 className="text-2xl md:text-4xl font-display font-black tracking-tight text-ink">
          A relationship, in numbers
        </h1>
        <p className="mt-2 text-sm md:text-base text-ink/60 font-medium max-w-lg mx-auto">
          Upload a WhatsApp chat export, answer a few questions, get a designed PDF magazine back.
          Nothing is stored — the chat is processed and discarded.
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {step === 'upload' && (
          <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="p-8 md:p-10">
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-colors ${
                  dragOver ? 'border-coral bg-blush' : 'border-ink/30 hover:border-ink/60'
                }`}
              >
                <Upload className="w-8 h-8 text-ink/40 mx-auto mb-3" />
                <p className="font-bold text-ink text-sm">Drop your WhatsApp .txt export here</p>
                <p className="text-xs text-ink/50 mt-1">or click to browse</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt"
                  className="hidden"
                  onChange={(e) => handleFile(e.target.files?.[0])}
                />
              </div>
              <div className="flex items-start gap-2 mt-5 text-xs text-ink/50 font-medium">
                <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  Export from WhatsApp: open the chat &rarr; contact/group name &rarr; Export Chat &rarr;
                  "Without Media". Unzip it and upload the .txt file.
                </p>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 'confirm' && (
          <motion.div key="confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="p-8 md:p-10 text-center">
              {!detected ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin text-ink/40 mx-auto mb-3" />
                  <p className="text-sm font-bold text-ink/60">Reading your export&hellip;</p>
                </>
              ) : (
                <>
                  <Users className="w-8 h-8 text-coral mx-auto mb-3" />
                  <p className="font-display font-black text-lg text-ink mb-4">
                    {detected.senders.join(' & ')}
                  </p>
                  <div className="grid grid-cols-2 gap-2 max-w-xs mx-auto mb-6">
                    {detected.senders.map((s) => (
                      <div key={s} className="bg-canvas border-2 border-black rounded-xl p-2.5">
                        <div className="text-lg font-black text-ink">{detected.message_counts[s]}</div>
                        <p className="text-[10px] font-bold text-ink/60">messages from {s}</p>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-ink/50 font-medium mb-6">
                    {detected.total_messages.toLocaleString()} messages total, detected correctly? If not, go back and check the export.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button onClick={reset} className="text-xs font-bold text-ink/50 hover:text-ink underline underline-offset-2">
                      Use a different file
                    </button>
                    <OffsetButton onClick={() => setStep('form')}>
                      Continue <ArrowRight className="w-4 h-4" />
                    </OffsetButton>
                  </div>
                </>
              )}
            </Card>
          </motion.div>
        )}

        {step === 'form' && (
          <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-5">
            <Card className="p-6 md:p-8 space-y-6">
              <PillChoice label="Design style" options={DESIGN_STYLES} value={config.design_style} onChange={(v) => setField('design_style', v)} />
              <PillChoice label="Relationship type" options={RELATIONSHIP_TYPES} value={config.relationship_type} onChange={(v) => setField('relationship_type', v)} />
              <PillChoice label="Emotional tone" hint="How honest should the emotional timeline read?" options={EMOTIONAL_TONES} value={config.emotional_tone} onChange={(v) => setField('emotional_tone', v)} />
              <PillChoice label="Length" options={LENGTHS} value={config.length} onChange={(v) => setField('length', v)} />
            </Card>

            <Card className="p-6 md:p-8 space-y-5">
              <div>
                <label className="text-sm font-display font-black text-ink mb-1 block">In-person meeting pattern</label>
                <p className="text-xs text-ink/50 font-medium mb-2">Optional — shown verbatim in "Beyond the Chat"</p>
                <Input value={config.meeting_pattern} onChange={(e) => setField('meeting_pattern', e.target.value)} placeholder="e.g. Meet every 1-2 months, 2-3 days near her city" />
              </div>
              <div>
                <label className="text-sm font-display font-black text-ink mb-1 block">Call habits</label>
                <p className="text-xs text-ink/50 font-medium mb-2">Optional — shown verbatim</p>
                <Input value={config.call_habits} onChange={(e) => setField('call_habits', e.target.value)} placeholder="e.g. Short daytime calls, longer calls most nights" />
              </div>
              <div>
                <label className="text-sm font-display font-black text-ink mb-1 block">Anything else offline?</label>
                <p className="text-xs text-ink/50 font-medium mb-2">Optional</p>
                <Textarea value={config.extra_context} onChange={(e) => setField('extra_context', e.target.value)} placeholder="e.g. Planning a trip together next" />
              </div>
            </Card>

            <Card className="p-6 md:p-8 space-y-5">
              <TagListInput
                label="Known nicknames"
                hint="The pipeline can't infer these without an LLM — list any pet names used in the chat"
                placeholder="Type a nickname, press Enter"
                values={config.known_nicknames}
                onChange={(v) => setField('known_nicknames', v)}
              />
              <TagListInput
                label="Known places"
                hint="Places mentioned that matter to the story"
                placeholder="Type a place, press Enter"
                values={config.known_places}
                onChange={(v) => setField('known_places', v)}
              />
            </Card>

            <div className="flex items-center justify-between pt-2">
              <button onClick={() => setStep('confirm')} className="text-xs font-bold text-ink/50 hover:text-ink underline underline-offset-2">
                Back
              </button>
              <OffsetButton onClick={generate}>
                <Heart className="w-4 h-4" /> Generate my magazine
              </OffsetButton>
            </div>
          </motion.div>
        )}

        {step === 'generating' && (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="p-10 text-center">
              <Loader2 className="w-8 h-8 animate-spin text-coral mx-auto mb-4" />
              <p className="font-display font-black text-ink">Building your magazine&hellip;</p>
              <p className="text-xs text-ink/50 font-medium mt-2 max-w-xs mx-auto">
                Charts, word clouds, and the sentiment timeline take a little while — this can take up to a minute,
                especially the first request after the backend's been idle.
              </p>
            </Card>
          </motion.div>
        )}

        {step === 'done' && (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="p-10 text-center" shadow="#059669">
              <div className="w-14 h-14 rounded-full bg-mint/30 border-2 border-black flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6 text-mint" fill="currentColor" />
              </div>
              <p className="font-display font-black text-lg text-ink mb-1">Your magazine is ready</p>
              <p className="text-xs text-ink/50 font-medium mb-6">Generated locally, nothing was saved on the server.</p>
              <div className="flex items-center justify-center gap-3">
                <button onClick={reset} className="text-xs font-bold text-ink/50 hover:text-ink underline underline-offset-2 inline-flex items-center gap-1">
                  <RotateCcw className="w-3 h-3" /> Make another
                </button>
                <OffsetButton onClick={() => { trackEvent('wa_magazine', 'download'); }} shadowBg="bg-mint">
                  <a href={pdfUrl} download="relationship-magazine.pdf" className="inline-flex items-center gap-2">
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                </OffsetButton>
              </div>
            </Card>
          </motion.div>
        )}

        {step === 'error' && (
          <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Card className="p-10 text-center" shadow="#E85D3A">
              <AlertTriangle className="w-8 h-8 text-coral mx-auto mb-3" />
              <p className="font-display font-black text-ink mb-1">Something went wrong</p>
              <p className="text-xs text-ink/60 font-medium mb-6 max-w-sm mx-auto">{errorMessage}</p>
              <OffsetButton onClick={reset}>
                <RotateCcw className="w-4 h-4" /> Start over
              </OffsetButton>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <p className="text-center text-[10px] text-ink/30 font-medium mt-8 flex items-center justify-center gap-1">
        <FileText className="w-3 h-3" /> Unlisted tool — not indexed, not linked from the site.
      </p>
    </div>
  );
};

export default RelationshipMagazine;
