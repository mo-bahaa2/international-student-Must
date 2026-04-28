import { useEffect, useState } from 'react';
import { getContactInfo, submitContactForm, type ContactInfo } from '../services/cmsApi';

function ContactCard({ title, lines }: { title: string; lines: string[] }) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      <div className="mt-4 space-y-2 text-slate-600 dark:text-slate-300">
        {lines.map((line, index) => (
          <p key={`${title}-${index}`}>{line}</p>
        ))}
      </div>
    </article>
  );
}

function ContactForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!firstName.trim() || !lastName.trim() || !subject.trim() || !message.trim()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      await submitContactForm({ firstName, lastName, subject, message });
      setFirstName('');
      setLastName('');
      setSubject('');
      setMessage('');
      setSubmitStatus('success');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
      <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Send a Message</h2>
      <form className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={(e) => { void handleSubmit(e); }}>
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 md:col-span-2"
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          required
          className="rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 md:col-span-2"
        />

        {submitStatus === 'success' && (
          <p className="md:col-span-2 text-sm text-emerald-600 dark:text-emerald-400">
            Your message has been sent. We will get back to you shortly.
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="md:col-span-2 text-sm text-red-600 dark:text-red-400">
            Failed to send. Please try again.
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="md:col-span-2 inline-flex justify-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}

const STATIC_CONTACT: ContactInfo = {
  email: 'admissions@must.edu.eg',
  phone: '+20 2 3824 7455',
  address: '6th of October City, Giza, Egypt',
  mapLink: null,
};

export function ContactUs() {
  const [contactInfo, setContactInfo] = useState<ContactInfo>(STATIC_CONTACT);

  useEffect(() => {
    const fetch = async () => {
      try {
        const info = await getContactInfo();
        if (info) setContactInfo(info);
      } catch {
        // keep static fallback
      }
    };
    void fetch();
  }, []);

  return (
    <div className="min-h-screen bg-white py-24 pt-32 dark:bg-[#070d19]">
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-8">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">Contact Us</h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">Get in touch with the university support and admissions teams.</p>
        </header>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <ContactCard
            title="Main Campus"
            lines={[contactInfo.address, `Phone: ${contactInfo.phone}`]}
          />
          <ContactCard
            title="Admissions"
            lines={[
              `Email: ${contactInfo.email}`,
              'Sun - Thu: 9:00 AM - 4:00 PM',
            ]}
          />
          {contactInfo.mapLink && (
            <ContactCard
              title="Location"
              lines={[contactInfo.address]}
            />
          )}
          {!contactInfo.mapLink && (
            <ContactCard
              title="Student Support"
              lines={[
                'Sun - Thu: 9:00 AM - 5:00 PM',
              ]}
            />
          )}
        </section>

        {contactInfo.mapLink && (
          <section className="mt-6">
            <a
              href={contactInfo.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 font-medium"
            >
              View on map →
            </a>
          </section>
        )}

        <section className="mx-auto mt-8 w-full max-w-4xl">
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
