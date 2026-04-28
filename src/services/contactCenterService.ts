import { getSupabaseConfigError, supabase } from '../lib/supabase';

const getTable = (envName: string, fallback: string) => {
  const value = import.meta.env[envName];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
};

const CONTACT_SUBMISSIONS_TABLE = getTable('VITE_SUPABASE_CONTACT_SUBMISSIONS_TABLE', 'contact_submissions');

export type ContactSubmissionType = 'super_admin_message' | 'complaint' | 'suggestion';

export type ContactSubmissionStatus = 'new' | 'reviewed' | 'resolved';

export type CreateContactSubmissionInput = {
  submissionType: ContactSubmissionType;
  senderName: string;
  senderEmail: string;
  subject?: string;
  messageText: string;
};

export async function createContactSubmission(input: CreateContactSubmissionInput): Promise<void> {
  const configError = getSupabaseConfigError();
  if (configError) {
    throw new Error(configError);
  }

  const payload = {
    submission_type: input.submissionType,
    sender_name: input.senderName.trim(),
    sender_email: input.senderEmail.trim().toLowerCase(),
    subject: input.subject?.trim() || null,
    message_text: input.messageText.trim(),
    status: 'new' as ContactSubmissionStatus,
  };

  const { error } = await supabase.from(CONTACT_SUBMISSIONS_TABLE).insert(payload);

  if (error) {
    throw new Error(error.message);
  }
}
