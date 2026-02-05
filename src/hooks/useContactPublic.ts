import { api } from "../lib/axios";
import { messageSchema } from "@/schemas/message.schema";
import { ApiResponse } from "../types/ApiResponse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { MESSAGE_KEY } from "./useAdminMessages";

const sendContactMessage = async (
  payload: z.infer<typeof messageSchema>,
): Promise<ApiResponse> => {
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
