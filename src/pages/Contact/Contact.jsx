import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CircleAlert, CircleCheck, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "../../components/common/PageHeader/PageHeader";
import Button from "../../components/common/Button/Button";
import GlassCard from "../../components/common/GlassCard/GlassCard";
import Reveal from "../../components/common/Reveal/Reveal";
import { SITE } from "../../utils/constants";

const EASE = [0.22, 1, 0.36, 1];
const EMPTY = { name: "", email: "", message: "" };
const MIN_MESSAGE = 10;

const inputClass =
  "w-full rounded-xl border bg-ink-deep/50 px-4 py-3 text-base text-chalk placeholder:text-slate-500 outline-none transition-colors duration-300 focus:bg-ink-deep/70";

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim()))
    errors.email = "That email address does not look right. Check it for typos.";
  if (values.message.trim().length < MIN_MESSAGE)
    errors.message = `Please write at least ${MIN_MESSAGE} characters so we can help.`;
  return errors;
}

function Field({ label, id, error, hint, children }) {
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-slate-300"
      >
        {label}
      </label>
      {children({ describedBy, invalid: Boolean(error) })}
      <div className="mt-2 min-h-[1.25rem] text-sm">
        {error ? (
          <p id={`${id}-error`} className="flex items-center gap-1.5 text-crimson-light">
            <CircleAlert aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
            {error}
          </p>
        ) : (
          hint && (
            <p id={`${id}-hint`} className="text-slate-400">
              {hint}
            </p>
          )
        )}
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, label, accent, children }) {
  return (
    <GlassCard accent={accent} className="rounded-2xl p-6">
      <div className="flex items-start gap-4">
        <span
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border"
          style={{ borderColor: `${accent}55`, color: accent }}
        >
          <Icon aria-hidden="true" className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <h2 className="eyebrow !text-[0.68rem]">{label}</h2>
          <div className="mt-3">{children}</div>
        </div>
      </div>
    </GlassCard>
  );
}

export default function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState(EMPTY);
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(null);

  const errors = validate(form);
  const showError = (field) => (touched[field] ? errors[field] : undefined);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (event) => setTouched((prev) => ({ ...prev, [event.target.name]: true }));

  const handleSubmit = (event) => {
    event.preventDefault();
    setTouched({ name: true, email: true, message: true });
    const found = validate(form);
    if (Object.keys(found).length > 0) {
      // send the person to the first field that needs attention
      const first = ["name", "email", "message"].find((field) => found[field]);
      document.getElementById(first)?.focus();
      return;
    }
    // There is no mail server behind this site: the message is handed to the visitor's mail app.
    const subject = `RIC'27 enquiry from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n${form.name.trim()}\n${form.email.trim()}`;
    const href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent({ href });
    setForm(EMPTY);
    setTouched({});
    window.location.href = href;
  };

  const border = (field) =>
    showError(field)
      ? "border-crimson-light/70 focus:border-crimson-light"
      : "border-chalk/15 hover:border-chalk/30 focus:border-mint";

  return (
    <div>
      <PageHeader eyebrow="Contact Us" title="Send us a tangent" accent={["tangent"]}>
        Have a question, an anomaly or a wild idea? Drop us a message and we’ll follow it back to you.
      </PageHeader>

      <section className="container-x grid gap-8 pb-32 lg:grid-cols-[1.25fr_0.75fr]">
        {/* Form */}
        <Reveal delay={0.2}>
          <div className="glass-strong rounded-[2rem] p-6 sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {sent ? (
                <motion.div
                  key="sent"
                  role="status"
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
                  className="flex min-h-[26rem] flex-col items-start justify-center"
                >
                  <span className="grid h-14 w-14 place-items-center rounded-2xl border border-mint/50 text-mint">
                    <CircleCheck aria-hidden="true" className="h-7 w-7" />
                  </span>
                  <h2 className="mt-8 text-3xl font-bold tracking-tight text-chalk sm:text-4xl">
                    Your message is ready to send.
                  </h2>
                  <p className="mt-4 max-w-md leading-relaxed text-slate-300">
                    Your email app should now be open with the message filled in. Press send there to
                    deliver it. If nothing opened, use the link below or write to {SITE.email}.
                  </p>
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button href={sent.href} magnetic={false}>
                      Open email app
                    </Button>
                    <Button variant="ghost" magnetic={false} type="button" onClick={() => setSent(null)}>
                      Write another
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  noValidate
                  onSubmit={handleSubmit}
                  initial={reduce ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduce ? 0 : 0.3 }}
                >
                  <div className="grid gap-x-6 sm:grid-cols-2">
                    <Field label="Name" id="name" error={showError("name")}>
                      {({ describedBy, invalid }) => (
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={invalid}
                          aria-describedby={describedBy}
                          className={`${inputClass} ${border("name")}`}
                          placeholder="Your name"
                        />
                      )}
                    </Field>
                    <Field label="Email" id="email" error={showError("email")}>
                      {({ describedBy, invalid }) => (
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={invalid}
                          aria-describedby={describedBy}
                          className={`${inputClass} ${border("email")}`}
                          placeholder="you@example.com"
                        />
                      )}
                    </Field>
                  </div>

                  <Field
                    label="Message"
                    id="message"
                    error={showError("message")}
                    hint={`${form.message.trim().length} characters · at least ${MIN_MESSAGE}`}
                  >
                    {({ describedBy, invalid }) => (
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={invalid}
                        aria-describedby={describedBy}
                        className={`${inputClass} ${border("message")} resize-none`}
                        placeholder="How can we help?"
                      />
                    )}
                  </Field>

                  <div className="mt-6 flex flex-wrap items-center gap-5">
                    <Button type="submit" magnetic={false} arrow>
                      Send Message
                    </Button>
                    <p className="text-sm text-slate-400">Opens your email app with the message ready.</p>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Info cards */}
        <Reveal delay={0.3}>
          <aside className="space-y-4">
            <InfoCard icon={Mail} label="Email" accent="#36E5E8">
              <a
                href={`mailto:${SITE.email}`}
                className="break-all font-display text-xl font-semibold text-chalk transition-colors hover:text-amber"
              >
                {SITE.email}
              </a>
            </InfoCard>

            {SITE.contacts.map((contact) => (
              <InfoCard key={contact.phone} icon={Phone} label={contact.role} accent="#FFC878">
                <p className="font-display text-lg font-semibold text-chalk">{contact.name}</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-1 inline-block text-sm text-slate-300 transition-colors hover:text-amber"
                >
                  {contact.phone}
                </a>
              </InfoCard>
            ))}

            <InfoCard icon={MapPin} label="Address" accent="#8CAAFF">
              <p className="text-sm leading-relaxed text-slate-300">{SITE.address}</p>
            </InfoCard>
          </aside>
        </Reveal>
      </section>
    </div>
  );
}
