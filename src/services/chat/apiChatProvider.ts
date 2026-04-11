import { apiRequest } from '../api';
import { apiClient } from '../api';
import type { AxiosError } from 'axios';
import type {
  ChatMessage,
  ChatConversation,
  ChatConversationListResponse,
  ChatCreateConversationPayload,
  ChatMarkReadPayload,
  ChatParticipant,
  ChatMessageListResponse,
  ChatProvider,
  ChatSendMessagePayload,
} from './types';

type UnknownRecord = Record<string, unknown>;

const toIso = (value: unknown): string => {
  if (typeof value === 'string' && value.trim()) {
    return value;
  }
  return new Date().toISOString();
};

const toNumber = (value: unknown, fallback = 0): number => {
  return typeof value === 'number' && Number.isFinite(value) ? value : fallback;
};

const toStringId = (value: unknown): string => {
  if (typeof value === 'string' && value) {
    return value;
  }
  if (typeof value === 'number' && Number.isFinite(value)) {
    return String(value);
  }
  return `conv_${Date.now()}`;
};

const participantFromAdmin = (adminUserId: number): ChatParticipant => ({
  id: adminUserId,
  displayName: adminUserId > 0 ? `Admin #${adminUserId}` : 'Admin',
  avatarUrl: null,
});

const mapConversation = (raw: UnknownRecord): ChatConversation => {
  const id = toStringId(raw.id ?? raw.documentId);
  const adminUserId = toNumber(raw.adminUserId, 0);
  const title = typeof raw.title === 'string' && raw.title.trim()
    ? raw.title
    : adminUserId > 0
      ? `Chat with Admin #${adminUserId}`
      : 'Chat';
  const updatedAt = toIso(raw.lastMessageAt ?? raw.updatedAt ?? raw.createdAt);

  return {
    id,
    title,
    participants: [participantFromAdmin(adminUserId)],
    lastMessage: null,
    unreadCount: toNumber(raw.unreadForUser ?? raw.unreadCount, 0),
    updatedAt,
  };
};

const mapMessage = (raw: UnknownRecord): ChatMessage => {
  const senderType = typeof raw.senderType === 'string' ? raw.senderType : 'admin';
  const senderId = senderType === 'user'
    ? toNumber(raw.senderFrontendUser, 0)
    : toNumber(raw.senderAdminUserId, 0);

  return {
    id: toStringId(raw.id ?? raw.documentId),
    conversationId: toStringId(raw.conversation ?? raw.conversationId),
    text: typeof raw.body === 'string' ? raw.body : typeof raw.text === 'string' ? raw.text : '',
    sender: {
      id: senderId,
      displayName: senderType === 'user' ? 'You' : senderId > 0 ? `Admin #${senderId}` : 'Admin',
      avatarUrl: null,
    },
    status: 'sent',
    createdAt: toIso(raw.createdAt),
    clientMessageId: typeof raw.clientMessageId === 'string' ? raw.clientMessageId : null,
  };
};

const extractArray = <T>(value: unknown): T[] => {
  if (Array.isArray(value)) {
    return value as T[];
  }
  if (value && typeof value === 'object' && Array.isArray((value as UnknownRecord).data)) {
    return (value as UnknownRecord).data as T[];
  }
  return [];
};

export function createApiChatProvider(): ChatProvider {
  return {
    async listConversations(page = 1, pageSize = 20): Promise<ChatConversationListResponse> {
      const response = await apiRequest<unknown>('/api/chat/conversations', {
        params: {
          page,
          pageSize,
        },
      });

      const rows = extractArray<UnknownRecord>(response);
      const data = rows.map(mapConversation);

      return {
        data,
        meta: {
          pagination: {
            page,
            pageSize,
            total: data.length,
            pageCount: 1,
          },
        },
      };
    },

    async listAdmins() {
      try {
        const response = await apiClient.get<{ data?: Array<{ id: number; firstname?: string; lastname?: string; email?: string }> }>('/api/chat/admins');

        if (response.status !== 200) {
          console.error('[chat/admins] non-200 response', {
            status: response.status,
            payload: response.data,
          });
          throw new Error('Unable to load admins');
        }

        const rows = Array.isArray(response.data?.data) ? response.data.data : [];

        return {
          data: rows.map((admin) => {
            const fullName = `${admin.firstname || ''} ${admin.lastname || ''}`.trim();

            return {
              id: admin.id,
              displayName: fullName || admin.email || `Admin #${admin.id}`,
              avatarUrl: null,
              role: 'admin',
            };
          }),
        };
      } catch (error) {
        const axiosError = error as AxiosError<{ error?: unknown }>;
        console.error('[chat/admins] request failed', {
          status: axiosError.response?.status,
          payload: axiosError.response?.data,
        });
        throw new Error('Unable to load admins');
      }
    },

    async createConversation(payload: ChatCreateConversationPayload): Promise<{ data: ChatConversation }> {
      const response = await apiRequest<unknown>('/api/chat/conversations/start', {
        method: 'POST',
        body: {
          adminUserId: payload.participantIds[0],
        },
      });

      const row = (response && typeof response === 'object' && 'data' in (response as UnknownRecord)
        ? (response as UnknownRecord).data
        : response) as UnknownRecord;

      return { data: mapConversation(row || {}) };
    },

    async listMessages(conversationId: string, cursor?: string | null, pageSize = 30): Promise<ChatMessageListResponse> {
      const response = await apiRequest<unknown>(`/api/chat/conversations/${conversationId}/messages`, {
        params: {
          ...(cursor ? { cursor } : {}),
          pageSize,
        },
      });

      const rows = extractArray<UnknownRecord>(response);

      return {
        data: rows.map(mapMessage),
        meta: {
          nextCursor: null,
        },
      };
    },

    async sendMessage(conversationId: string, payload: ChatSendMessagePayload) {
      const response = await apiRequest<unknown>(`/api/chat/conversations/${conversationId}/messages`, {
        method: 'POST',
        body: {
          body: payload.text,
          clientMessageId: payload.clientMessageId,
        },
      });

      const row = (response && typeof response === 'object' && 'data' in (response as UnknownRecord)
        ? (response as UnknownRecord).data
        : response) as UnknownRecord;

      return {
        data: mapMessage({
          ...(row || {}),
          conversation: conversationId,
        }),
      };
    },

    async markRead(conversationId: string, payload: ChatMarkReadPayload) {
      try {
        return await apiRequest<{ data: { conversationId: string; unreadCount: number } }>(`/api/chat/conversations/${conversationId}/read`, {
          method: 'POST',
          body: payload,
        });
      } catch {
        return {
          data: {
            conversationId,
            unreadCount: 0,
          },
        };
      }
    },
  };
}
