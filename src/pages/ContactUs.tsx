import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getContactInfo, type ContactInfo } from '../services/cmsApi';
import {
  createContactSubmission,
  type ContactSubmissionType,
} from '../services/contactCenterService';

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

type ContactFlowGroup = 'feedback' | 'leadership';

const CONTACT_TYPE_OPTIONS: Array<{
  description: string;
  group: ContactFlowGroup;
  helper: string;
  label: string;
  value: ContactSubmissionType;
}> = [
  {
    value: 'super_admin_message',
    group: 'leadership',
    label: 'Super Admin / Sector Head',
    description: 'Sector channel',
    helper: 'Use this for direct escalation, official requests, or a message that should reach the super admin or sector head.',
  },
  {
    value: 'complaint',
    group: 'feedback',
    label: 'Complaint',
    description: 'Report a problem',
    helper: 'Share an issue that needs review, follow-up, or a formal response from the contact center.',
  },
  {
    value: 'suggestion',
    group: 'feedback',
    label: 'Suggestion',
    description: 'Share an improvement idea',
    helper: 'Send a recommendation that could improve services, communication, or the student experience.',
  },
];

type FormErrors = {
  email?: string;
  message?: string;
  name?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_FORM_STATE = {
  email: '',
  message: '',
  name: '',
  subject: '',
  submissionType: 'super_admin_message' as ContactSubmissionType,
};

function ContactForm() {
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const requestedType = searchParams.get('type');
  const requestedGroup = searchParams.get('group');

  useEffect(() => {
    if (
      requestedType === 'super_admin_message' ||
      requestedType === 'complaint' ||
      requestedType === 'suggestion'
    ) {
      setFormData((current) => ({
        ...current,
        submissionType: requestedType,
      }));
      return;
    }

    if (requestedGroup === 'leadership') {
      setFormData((current) => ({
        ...current,
        submissionType: 'super_admin_message',
      }));
      return;
    }

    if (requestedGroup === 'feedback') {
      setFormData((current) => ({
        ...current,
        submissionType:
          current.submissionType === 'super_admin_message' ? 'complaint' : current.submissionType,
      }));
    }
  }, [requestedGroup, requestedType]);

  const activeOption = useMemo(
    () => CONTACT_TYPE_OPTIONS.find((option) => option.value === formData.submissionType) ?? CONTACT_TYPE_OPTIONS[0],
    [formData.submissionType],
  );
  const activeGroup: ContactFlowGroup = activeOption.group;
  const leadershipOption = CONTACT_TYPE_OPTIONS.find((option) => option.group === 'leadership') ?? CONTACT_TYPE_OPTIONS[0];
  const feedbackOptions = CONTACT_TYPE_OPTIONS.filter((option) => option.group === 'feedback');

  const updateField = (field: keyof typeof INITIAL_FORM_STATE, value: string) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));

    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const validateForm = (): FormErrors => {
    const nextErrors: FormErrors = {};

    if (!formData.name.trim()) {
      nextErrors.name = 'Name is required.';
    }

    if (!formData.email.trim()) {
      nextErrors.email = 'Email is required.';
    } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.message.trim()) {
      nextErrors.message = 'Message is required.';
    }

    return nextErrors;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus('idle');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');
    try {
      await createContactSubmission({
        submissionType: formData.submissionType,
        senderName: formData.name,
        senderEmail: formData.email,
        subject: formData.subject,
        messageText: formData.message,
      });
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
      setSubmitStatus('success');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Failed to send. Please try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
      <div className="max-w-2xl">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Send a message</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Choose a channel, then send your message to the contact center.
        </p>
      </div>

      <div className="mt-6">
        <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1 dark:border-slate-700 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => updateField('submissionType', leadershipOption.value)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeGroup === 'leadership'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
            }`}
          >
            Sector Channel
          </button>
          <button
            type="button"
            onClick={() => updateField('submissionType', 'complaint')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              activeGroup === 'feedback'
                ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-slate-100'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100'
            }`}
          >
            Feedback Channel
          </button>
        </div>

        {activeGroup === 'feedback' && (
          <div className="mt-4 flex flex-wrap gap-3">
            {feedbackOptions.map((option) => {
              const isActive = formData.submissionType === option.value;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => updateField('submissionType', option.value)}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-700 dark:border-emerald-400 dark:bg-emerald-500/10 dark:text-emerald-300'
                      : 'border-slate-300 text-slate-600 hover:border-slate-400 dark:border-slate-600 dark:text-slate-300 dark:hover:border-slate-500'
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
          <span className="font-semibold text-slate-900 dark:text-slate-100">{activeOption.label}</span>
          <span className="ml-2">{activeOption.helper}</span>
        </div>
      </div>

      <form className="mt-6 space-y-5" onSubmit={(e) => { void handleSubmit(e); }}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              aria-invalid={Boolean(errors.name)}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 ${
                errors.name
                  ? 'border-red-300 focus:ring-red-500 dark:border-red-500/70'
                  : 'border-slate-300 focus:ring-emerald-500 dark:border-slate-600'
              }`}
            />
            {errors.name && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => updateField('email', e.target.value)}
              aria-invalid={Boolean(errors.email)}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 ${
                errors.email
                  ? 'border-red-300 focus:ring-red-500 dark:border-red-500/70'
                  : 'border-slate-300 focus:ring-emerald-500 dark:border-slate-600'
              }`}
            />
            {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.email}</p>}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
            Subject <span className="text-slate-400 dark:text-slate-500">(Optional)</span>
          </label>
          <input
            type="text"
            placeholder="Add a subject"
            value={formData.subject}
            onChange={(e) => updateField('subject', e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-900 dark:text-slate-100">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Write your message here"
            value={formData.message}
            onChange={(e) => updateField('message', e.target.value)}
            rows={6}
            aria-invalid={Boolean(errors.message)}
            className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-400 ${
              errors.message
                ? 'border-red-300 focus:ring-red-500 dark:border-red-500/70'
                : 'border-slate-300 focus:ring-emerald-500 dark:border-slate-600'
            }`}
          />
          {errors.message && <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.message}</p>}
        </div>

        {submitStatus === 'success' && (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
            Your message has been sent successfully.
          </p>
        )}
        {submitStatus === 'error' && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
            {errorMessage || 'Failed to send. Please try again.'}
          </p>
        )}

        <div className="flex flex-col gap-3 border-t border-slate-200 pt-4 dark:border-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Required fields are marked with <span className="font-semibold text-red-500">*</span>.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex min-w-[170px] justify-center rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
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
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 md:text-5xl">Contact Center</h1>
          <p className="mt-3 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
            Send a message to the sector channel or share feedback through a simple contact form.
          </p>
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

        <section className="mx-auto mt-8 w-full max-w-3xl">
          <ContactForm />
        </section>
      </div>
    </div>
  );
}
