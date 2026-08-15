import React, { useState } from 'react';
import { Send, Mail, MessageSquare, Instagram, CheckCircle2, Sparkles, ShieldCheck, Clock, HelpCircle, ExternalLink, Copy } from 'lucide-react';
import { ContactMessage } from '../types';

interface ContactViewProps {
  instagramUrl: string;
  contactEmail: string;
  telegramUrl: string;
  contactNote: string;
  onSubmitMessage: (msg: Omit<ContactMessage, 'id' | 'timestamp' | 'isRead'>) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  instagramUrl,
  contactEmail,
  telegramUrl,
  contactNote,
  onSubmitMessage
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Anime Request');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copiedType, setCopiedType] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    onSubmitMessage({
      name: name.trim(),
      email: email.trim() || 'Not provided',
      subject,
      message: message.trim()
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-violet-950 via-zinc-900 to-emerald-950 border border-zinc-800 p-8 overflow-hidden shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/30 text-violet-300 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            <span>Official Support & Channels</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Get in Touch with <span className="text-violet-400">AnimeYatra</span>
          </h1>
          <p className="text-sm text-zinc-300 leading-relaxed">
            {contactNote || 'Have an anime request, broken server link report, or sponsorship inquiry? Reach out to our team directly via Instagram, Email, or Telegram!'}
          </p>
        </div>
      </div>

      {/* Bento Grid: Contact Channels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Instagram Channel Card */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between hover:border-pink-500/40 transition group shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 via-pink-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 bg-pink-500/10 px-2.5 py-1 rounded-full border border-pink-500/20">
                Instagram
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Official Instagram</h3>
              <p className="text-xs text-zinc-400">Follow for daily reels, dubbed episode teasers, and quick DM support.</p>
            </div>
            <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs font-mono text-zinc-300 truncate flex justify-between items-center">
              <span className="truncate">{instagramUrl || '@animeyatra_official'}</span>
              <button
                onClick={() => copyToClipboard(instagramUrl || 'https://instagram.com/animeyatra_official', 'instagram')}
                className="ml-2 text-zinc-400 hover:text-white p-1"
                title="Copy link"
              >
                {copiedType === 'instagram' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <a
            href={instagramUrl.startsWith('http') ? instagramUrl : `https://instagram.com/${instagramUrl.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full py-2.5 px-4 bg-gradient-to-r from-pink-600 to-violet-600 hover:from-pink-500 hover:to-violet-500 text-white font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 shadow-md shadow-pink-600/20"
          >
            <span>Open Instagram</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Email Support Card */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between hover:border-violet-500/40 transition group shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-violet-600 flex items-center justify-center text-white shadow-lg shadow-violet-600/20 group-hover:scale-105 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-violet-400 bg-violet-500/10 px-2.5 py-1 rounded-full border border-violet-500/20">
                Email
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Direct Support Email</h3>
              <p className="text-xs text-zinc-400">Send business inquiries, DMCA requests, or detailed feedback directly.</p>
            </div>
            <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs font-mono text-zinc-300 truncate flex justify-between items-center">
              <span className="truncate">{contactEmail || 'support@animeyatra.in'}</span>
              <button
                onClick={() => copyToClipboard(contactEmail || 'support@animeyatra.in', 'email')}
                className="ml-2 text-zinc-400 hover:text-white p-1"
                title="Copy email"
              >
                {copiedType === 'email' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <a
            href={`mailto:${contactEmail || 'support@animeyatra.in'}`}
            className="mt-6 w-full py-2.5 px-4 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 shadow-md shadow-violet-600/20"
          >
            <span>Send Email</span>
            <Mail className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Telegram Channel Card */}
        <div className="rounded-3xl bg-zinc-900 border border-zinc-800 p-6 flex flex-col justify-between hover:border-sky-500/40 transition group shadow-lg">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-2xl bg-sky-500 flex items-center justify-center text-white shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                Telegram
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-1">Telegram Community</h3>
              <p className="text-xs text-zinc-400">Instant notification channel for new episode drops, batch zips, & requests.</p>
            </div>
            <div className="p-3 bg-zinc-950 rounded-2xl border border-zinc-800 text-xs font-mono text-zinc-300 truncate flex justify-between items-center">
              <span className="truncate">{telegramUrl || 'https://t.me/animeyatra_official'}</span>
              <button
                onClick={() => copyToClipboard(telegramUrl || 'https://t.me/animeyatra_official', 'telegram')}
                className="ml-2 text-zinc-400 hover:text-white p-1"
                title="Copy link"
              >
                {copiedType === 'telegram' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
          <a
            href={telegramUrl.startsWith('http') ? telegramUrl : `https://t.me/${telegramUrl.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 w-full py-2.5 px-4 bg-sky-500 hover:bg-sky-400 text-white font-bold text-xs rounded-2xl transition flex items-center justify-center gap-2 shadow-md shadow-sky-500/20"
          >
            <span>Join Telegram Channel</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Main Grid: Send Direct Message & FAQ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Contact Form Column */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="border-b border-zinc-800 pb-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Send className="w-5 h-5 text-violet-400" />
              <span>Send Direct Message to Admins</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-1">
              Your message will be sent directly to the AnimeYatra Control Panel for our Owner and Admin team to review.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-6 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-white">Message Sent Successfully!</h3>
              <p className="text-xs text-zinc-300 max-w-md mx-auto">
                Thank you for reaching out! Our team has received your submission and will review it in the Admin Control Panel.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-bold py-2 px-5 rounded-full transition"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Your Name <span className="text-violet-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                    Email / Telegram Username
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. rahul@gmail.com or @rahul_anime"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Subject Category
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500 transition"
                >
                  <option value="Anime Request">Request New Anime / Season</option>
                  <option value="Report Broken Link">Report Broken Episode / Stream Server</option>
                  <option value="Audio / Language Query">Hindi / Tamil Dubbing Query</option>
                  <option value="Sponsorship & Inquiry">Business & Sponsorship Inquiry</option>
                  <option value="General Feedback">General Feedback & Website Bug</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-300 uppercase mb-1">
                  Your Message <span className="text-violet-400">*</span>
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your request, problem, or feedback in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-violet-500 transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs py-3.5 rounded-2xl transition shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Message to Control Panel</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info & Support Status */}
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-zinc-800 pb-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Support Overview</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3 p-3 bg-zinc-950 rounded-2xl border border-zinc-800/80">
                <Clock className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Average Response Time</h4>
                  <p className="text-[11px] text-zinc-400">Within 2–12 hours for email & direct submissions.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-zinc-950 rounded-2xl border border-zinc-800/80">
                <MessageSquare className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Instant Notifications</h4>
                  <p className="text-[11px] text-zinc-400">Join our Telegram channel for immediate episode upload announcements.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-zinc-950 rounded-2xl border border-zinc-800/80">
                <Instagram className="w-4 h-4 text-pink-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Anime Requests</h4>
                  <p className="text-[11px] text-zinc-400">DM us on Instagram or submit the form on the left for new dub additions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-950/60 to-zinc-900 border border-violet-800/40 rounded-3xl p-6 text-center space-y-3 shadow-xl">
            <HelpCircle className="w-8 h-8 text-violet-400 mx-auto" />
            <h3 className="text-sm font-bold text-white">Ad-Blocker & Player Help?</h3>
            <p className="text-xs text-zinc-400">
              Check out our AD Guide to learn how to bypass video player popups cleanly.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
