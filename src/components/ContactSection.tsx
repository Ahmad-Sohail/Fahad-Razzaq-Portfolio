import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          _subject: `New portfolio message from ${formData.name.trim()}`,
          _replyto: formData.email.trim(),
          _template: 'table',
          _captcha: false,
          _honey: '',
        }),
      });

      const result: { success?: boolean; message?: string } = await response.json();
      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'FormSubmit could not deliver the message.');
      }

      setIsSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      setIsSubmitting(false);
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'Message send nahi ho saka. Please try again or use the email link.',
      );
    }
  };

  const handleDirectMail = () => {
    const subject = encodeURIComponent('Executive Opportunity — Fahad Razzaq');
    const body = encodeURIComponent(
      `Dear Fahad Razzaq,\n\n${formData.message || 'I am reaching out regarding an executive administration opportunity.'}\n\nBest regards,\n${formData.name || 'Hiring Team'}\n${formData.email || ''}`
    );
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="scroll-mt-24 overflow-hidden bg-background py-16 sm:py-24">
      <div className="mx-auto min-w-0 max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              <span className="font-display text-sm tracking-normal">05</span>
              <span className="h-px w-10 bg-gold/50" />
              Contact
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Let's work together.
            </h2>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Open to senior administration and operations roles across the Gulf and Pakistan.
        </motion.p>

        <div className="mt-12 grid min-w-0 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          {/* Left Cards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="min-w-0 space-y-4"
          >
            {/* Phone */}
            <motion.a
              whileHover={{ x: 4, borderColor: 'rgba(201, 162, 39, 0.4)' }}
              href="tel:+923224564375"
              rel="noreferrer"
              className="group flex min-w-0 max-w-full items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors sm:gap-4 sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-phone h-5 w-5"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Phone / WhatsApp
                </p>
                <p className="min-w-0 truncate font-medium text-foreground">
                  {PERSONAL_INFO.phone}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-right h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-gold"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </motion.a>

            {/* Email */}
            <motion.a
              whileHover={{ x: 4, borderColor: 'rgba(201, 162, 39, 0.4)' }}
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group flex min-w-0 max-w-full items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors sm:gap-4 sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail h-5 w-5"
                >
                  <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Email
                </p>
                <p className="min-w-0 truncate font-medium text-foreground">
                  {PERSONAL_INFO.email}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-right h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-gold"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </motion.a>

            {/* LinkedIn */}
            <motion.a
              whileHover={{ x: 4, borderColor: 'rgba(201, 162, 39, 0.4)' }}
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group flex min-w-0 max-w-full items-center gap-3 rounded-2xl border border-border bg-surface p-4 transition-colors sm:gap-4 sm:p-5"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  LinkedIn
                </p>
                <p className="min-w-0 truncate font-medium text-foreground">
                  {PERSONAL_INFO.linkedinDisplay}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-arrow-up-right h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-gold"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </motion.a>

            {/* Location & Availability Card */}
            <div className="rounded-2xl border border-border/70 bg-surface/60 p-4 sm:p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                Regional Mobility &amp; Relocation
              </p>
              <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Available for executive operations and site administration positions across Saudi Arabia (NEOM, Riyadh, Jeddah), UAE, and Pakistan.
              </p>
            </div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="min-w-0 rounded-3xl border border-border bg-card p-6 shadow-xl sm:p-8"
          >
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="submitted"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold border border-gold/30">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Message Sent
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
                      Thank you, {formData.name}. Your message has been delivered to Fahad's inbox.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={handleDirectMail}
                        className="rounded-full bg-gold px-6 py-2.5 text-xs font-semibold text-background hover:bg-glow transition-colors cursor-pointer"
                      >
                        Open Mail App
                      </motion.button>
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setSubmitError('');
                          setFormData({ name: '', email: '', message: '' });
                        }}
                        className="rounded-full border border-border px-5 py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                      >
                        Send Another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-foreground">
                          Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your name"
                          className="block min-w-0 max-w-full w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/30"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-foreground">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your@email.com"
                          className="block min-w-0 max-w-full w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/30"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-foreground">
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell me about the role or project..."
                        className="block min-w-0 max-w-full w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground outline-none transition-shadow placeholder:text-muted-foreground/60 focus:border-gold focus:ring-2 focus:ring-gold/30"
                      />
                    </div>

                    <div className="hidden" aria-hidden="true">
                      <label htmlFor="website">Leave this field empty</label>
                      <input id="website" name="_honey" type="text" tabIndex={-1} autoComplete="off" />
                    </div>

                    {submitError && (
                      <p role="alert" className="text-sm leading-relaxed text-red-400">
                        {submitError}
                      </p>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-background transition-colors hover:bg-glow cursor-pointer disabled:opacity-50 shadow-md shadow-gold/20"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-send h-4 w-4"
                      >
                        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
                        <path d="m21.854 2.147-10.94 10.939" />
                      </svg>
                      <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
