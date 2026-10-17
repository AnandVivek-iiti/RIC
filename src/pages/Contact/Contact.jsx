import { useState } from "react";
import Button from "../../components/common/Button/Button";
import { SITE } from "../../utils/constants";

const inputClass =
  "w-full rounded-lg border border-mint/25 bg-ink-light/40 px-4 py-2.5 text-sm text-chalk placeholder:text-slate-500 outline-none transition focus:border-amber focus:ring-2 focus:ring-amber/30";

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
    <div className="mx-auto max-w-5xl px-4 py-16">
      <header className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-mint">Contact Us</p>
        <h1 className="mt-2 font-display text-4xl font-bold text-chalk sm:text-5xl">
          Send us a tangent
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-slate-400">
          Have a question, an anomaly or a wild idea? Drop us a message and we'll follow it back to
          you.
        </p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-300">
              Name
            </label>
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
          </div>

          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-300">
              Email
            </label>
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
          </div>

          <div>
            <label htmlFor="message" className="mb-1 block text-sm font-medium text-slate-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              className={inputClass}
              placeholder="How can we help?"
            />
          </div>

          <Button type="submit">Send Message</Button>

          {sent && (
            <p className="text-sm font-medium text-mint">
              Thanks! Your message has been noted.
            </p>
          )}
        </form>

        <aside className="space-y-4 rounded-xl border border-mint/20 bg-ink-light/40 p-6">
          <h2 className="font-display text-lg font-semibold text-chalk">Reach us directly</h2>
          <ul className="space-y-3 text-sm text-slate-400">
            <li>
              <span className="font-medium text-chalk">Email:</span> {SITE.email}
            </li>
            <li>
              <span className="font-medium text-chalk">Phone:</span> {SITE.phone}
            </li>
            <li>
              <span className="font-medium text-chalk">Address:</span> {SITE.address}
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
