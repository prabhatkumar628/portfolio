"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { IMessage } from "../models/message.model";

export type FetchMessagesParams = {
  status?: string;
  priority?: string;
  page?: number;
  limit?: number;
  search?: string;
};

export type AdminMessagesResponse = {
  messages: IMessage[];
  pagination: {
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
  totalMessages: number;
  unreadCount: number;
  replyMessageCount: number;
  spanCount: number;
};

export type UpdateMessagePayload = {
  id: string;
  payload: {
    status?: "new" | "read" | "replied" | "spam";
    priority?: "low" | "medium" | "high";
    reply?: string;
    isSpam?: boolean;
    adminNotes?: string;
    repliedAt?: Date;
  };
};

export const MESSAGE_KEY = {
  all: ["admin", "messages"] as const,
  unreadCount: ["admin", "messages", "count"] as const,
  list: (q: FetchMessagesParams) =>
    [
      "admin",
      "messages",
      "list",
      q.status,
      q.priority,
      q.page,
      q.limit,
      q.search,
    ] as const,
  single: (id: string) => ["admin", "messages", "detail", id] as const,
};

export const useGetAdminMessages = (params: FetchMessagesParams) => {
  return useQuery({
    queryKey: MESSAGE_KEY.list(params),
    queryFn: async (): Promise<AdminMessagesResponse> => {
      const { data } = await api.get("/admin/messages", { params });
      return data.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 30 * 1000,
  });
};

export const useGetMessageById = (id: string) => {
  return useQuery({
    queryKey: MESSAGE_KEY.single(id),
    queryFn: async (): Promise<IMessage> => {
      const { data } = await api.get(`/admin/messages/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useUpdateMessageById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: UpdateMessagePayload): Promise<IMessage> => {
      const { data } = await api.patch(`/admin/messages/${id}`, payload);
      return data.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: MESSAGE_KEY.single(variables.id),
      });

      queryClient.invalidateQueries({
        queryKey: MESSAGE_KEY.all,
      });
    },
  });
};

export const useDeleteMessageById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/admin/messages/${id}`);
      return data.data;
    },
    onSuccess: (_, id) => {
      queryClient.removeQueries({
        queryKey: MESSAGE_KEY.single(id),
      });
      queryClient.invalidateQueries({
        queryKey: MESSAGE_KEY.all,
      });
    },
  });
};

export const useMarkAllAsReadMessages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.patch("/admin/messages/mark-read");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MESSAGE_KEY.all });
    },
  });
};

export const useUnreadMessageCount = () => {
  return useQuery({
    queryKey: MESSAGE_KEY.unreadCount,
    queryFn: async () => {
      const { data } = await api.get("/admin/messages/unread-count");
      return data.data;
    },
    staleTime: 10 * 1000,
    refetchOnWindowFocus: true,
  });
};
