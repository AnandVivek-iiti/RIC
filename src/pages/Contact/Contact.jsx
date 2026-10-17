import { useState } from "react";
import { motion } from "framer-motion";
import Button from "../../components/common/Button/Button";
import Magnetic from "../../components/common/Magnetic/Magnetic";
import Reveal from "../../components/common/Reveal/Reveal";
import SplitText from "../../components/common/SplitText/SplitText";
import { SITE } from "../../utils/constants";

const EASE = [0.22, 1, 0.36, 1];

const inputClass =
  "w-full border-0 border-b border-white/15 bg-transparent px-0 pb-3 pt-2 text-base text-chalk placeholder:text-slate-600 outline-none transition-colors";

function Field({ label, id, children }) {
  return (
    <div className="group relative">
      <label
        htmlFor={id}
        className="block text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-slate-400 transition-colors group-focus-within:text-amber"
      >
        {label}
      </label>
      {children}
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-amber via-crimson to-mint transition-transform duration-500 ease-out group-focus-within:scale-x-100"
      />
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="container-x pb-32 pt-32 sm:pt-44">
      <header className="max-w-3xl">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: EASE }}
        >
          Contact Us
        </motion.p>
        <SplitText
          as="h1"
          className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight text-chalk sm:text-7xl"
          text="Send us a tangent"
          accent={["tangent"]}
          animateOnMount
          delay={0.55}
        />
        <motion.p
          className="mt-8 max-w-xl text-lg leading-relaxed text-slate-400"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: EASE }}
        >
          Have a question, an anomaly or a wild idea? Drop us a message and we'll follow it back to
          you.
        </motion.p>
      </header>

      <div className="mt-20 grid gap-16 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal delay={0.4}>
          <form onSubmit={handleSubmit} className="space-y-10">
            <Field label="Name" id="name">
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                className={inputClass}
                placeholder="Your name"
              />
            </Field>

            <Field label="Email" id="email">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className={inputClass}
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Message" id="message">
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                placeholder="How can we help?"
              />
            </Field>

            <div className="flex flex-wrap items-center gap-6">
              <Magnetic>
                <Button type="submit" magnetic={false}>Send Message</Button>
              </Magnetic>
              {sent && (
                <motion.p
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="text-sm font-medium text-mint"
                >
                  Thanks! Your message has been noted.
                </motion.p>
              )}
            </div>
          </form>
        </Reveal>

        <Reveal delay={0.5}>
          <aside className="space-y-8 border-white/10 lg:border-l lg:pl-12">
            <div>
              <h2 className="eyebrow">Email</h2>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-3 inline-block font-display text-xl font-semibold text-chalk transition-colors hover:text-amber"
              >
                {SITE.email}
              </a>
            </div>

            {SITE.contacts.map((contact) => (
              <div key={contact.phone}>
                <h2 className="eyebrow">{contact.role}</h2>
                <p className="mt-3 font-display text-lg font-semibold text-chalk">{contact.name}</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="mt-1 inline-block text-sm text-slate-400 transition-colors hover:text-amber"
                >
                  {contact.phone}
                </a>
              </div>
            ))}

            <div>
              <h2 className="eyebrow">Address</h2>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-400">{SITE.address}</p>
            </div>
          </aside>
        </Reveal>
      </div>
    </div>
  );
}
