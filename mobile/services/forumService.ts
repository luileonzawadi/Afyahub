import api from './api';

export interface ForumTopic {
  id: number;
  title: string;
  content: string;
  category: string;
  author: {
    id: number;
    name: string;
  };
  created_at: string;
  replies_count: number;
  likes_count: number;
  is_liked?: boolean;
}

export interface ForumReply {
  id: number;
  content: string;
  author: {
    id: number;
    name: string;
  };
  created_at: string;
}

export const forumService = {
  // Get all forum topics
  getTopics: async (category?: string): Promise<ForumTopic[]> => {
    const params = category ? { category } : {};
    const response = await api.get('/forum/topics', { params });
    return response.data;
  },

  // Get topic by ID with replies
  getTopic: async (id: number): Promise<{ topic: ForumTopic; replies: ForumReply[] }> => {
    const response = await api.get(`/forum/topics/${id}`);
    return response.data;
  },

  // Create new topic
  createTopic: async (data: { title: string; content: string; category: string }): Promise<ForumTopic> => {
    const response = await api.post('/forum/topics', data);
    return response.data;
  },

  // Create reply
  createReply: async (topicId: number, content: string): Promise<ForumReply> => {
    const response = await api.post(`/forum/topics/${topicId}/replies`, { content });
    return response.data;
  },

  // Like/unlike topic
  toggleLike: async (topicId: number): Promise<void> => {
    await api.post(`/forum/topics/${topicId}/like`);
  },

  // Delete topic (author/admin only)
  deleteTopic: async (topicId: number): Promise<void> => {
    await api.delete(`/forum/topics/${topicId}`);
  }
};