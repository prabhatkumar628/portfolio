import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { ApiResponse } from "../types/ApiResponse";
import { ISettings } from "../models/settings.model";
import { UpdateSettingsInput } from "../schemas/admin.settings";
// import { SiteSettingsFormValues } from "../schemas/admin.settings.site.settings";
// import { SiteSettingsFormValues } from "../schemas/siteSettingsSchema";

export const useSettingsUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation<
    ApiResponse<ISettings>,         // response type
    Error,                          // error type
    UpdateSettingsInput        // payload type
  >({
    mutationFn: async (payload) => {
      const { data } = await api.patch("/admin/settings", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["public", "settings"],
      });
    },
  });
};
