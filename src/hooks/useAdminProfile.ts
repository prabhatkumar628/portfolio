import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { IUser } from "../models/user.model";
import {
  ProfileFormInputs,
  UpdatePasswordInputs,
} from "../schemas/admin.profile.schema";

const PROFILE_KEY = {
  admin: ["admin", "profile"],
};

export const useGetAdminProfile = () => {
  return useQuery<IUser>({
    queryKey: PROFILE_KEY.admin,
    queryFn: async () => {
      const { data } = await api.get("/admin/profile");
      return data.data;
    },
  });
};

export const useUpdateAdminProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ProfileFormInputs) => {
      const { data } = await api.patch("/admin/profile", payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEY.admin });
    },
  });
};

export const useUpdateAdminPassword = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: UpdatePasswordInputs) => {
      const { data } = await api.patch(
        "/admin/profile/update-password",
        payload,
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEY.admin });
    },
  });
};
