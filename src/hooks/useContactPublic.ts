import { api } from "../lib/axios";
import { messageSchema } from "@/schemas/message.schema";
import { ApiResponse } from "../types/ApiResponse";
import { useMutation } from "@tanstack/react-query";
import * as z from "zod";

const sendContactMessage = async (
  payload: z.infer<typeof messageSchema>,
): Promise<ApiResponse> => {
  const response = await api.post("/public/contact", payload);
  return response.data;
};

export const useContact = () => {
  return useMutation({
    mutationFn: sendContactMessage,
  });
};
