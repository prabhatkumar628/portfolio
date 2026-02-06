import { api } from "../lib/axios";
import { messageSchema } from "@/schemas/message.schema";
import { ApiResponse } from "../types/ApiResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { MESSAGE_KEY } from "./useAdminMessages";
import { ISkill } from "../models/skill.model";
import { IExperience } from "../models/experience.model";
import { IMessage } from "../models/message.model";
import { ISettings } from "../models/settings.model";

const sendContactMessage = async (
  payload: z.infer<typeof messageSchema>,
): Promise<ApiResponse<IMessage>> => {
  const response = await api.post("/public/contact", payload);
  return response.data;
};

export const useContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendContactMessage,
    onSuccess: () => {
      queryClient.setQueryData<number>(
        MESSAGE_KEY.unreadCount,
        (old) => (old ?? 0) + 1,
      );

      queryClient.invalidateQueries({
        queryKey: MESSAGE_KEY.unreadCount,
      });
    },
  });
};

export interface SkillGroupData {
  frontendData: ISkill[];
  backendData: ISkill[];
  toolsData: ISkill[];
}

export const useSkills = () => {
  return useQuery<SkillGroupData>({
    queryKey: ["public", "skills"],
    queryFn: async () => {
      const { data } =
        await api.get<ApiResponse<SkillGroupData>>("/public/skills");
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useExperience = () => {
  return useQuery<IExperience[]>({
    queryKey: ["public", "experiences"],
    queryFn: async () => {
      const { data } =
        await api.get<ApiResponse<IExperience[]>>("/public/experience");
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
    retryDelay: 1000,
  });
};

export const useSettings = () => {
  return useQuery<ISettings>({
    queryKey: ["public", "settings"],
    queryFn: async () => {
      const { data } =
        await api.get<ApiResponse<ISettings>>("/public/settings");
      if (!data.success) {
        throw new Error(data.message);
      }
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
    retry: 1,
    retryDelay: 1000,
  });
};
