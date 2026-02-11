import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ISkill } from "../models/skill.model";
import { api } from "../lib/axios";
import { SkillFormInputs } from "../schemas/admin.skill.schema";
import { ApiResponse } from "../types/ApiResponse";

export type FetchSkillsParams = {
  limit?: number;
  page?: number;
  search?: string;
  category?: string;
};

export type AdminSkillsResponse = {
  skills: ISkill[];
  totalCount: number;
  frontendCount: number;
  backendCount: number;
  toolsCount: number;
  pagination: {
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
};

// export type GetSkillById = {

// }
const SKILL_KEY = {
  byId: (id: string) => ["admin", "skills", id],
  all: ["admin", "skills"],
  list: (q: FetchSkillsParams) => [
    "admin",
    "skills",
    q.limit,
    q.page,
    q.search,
    q.category,
  ],
};

export const useAdminSkills = (params: FetchSkillsParams) => {
  return useQuery({
    queryKey: SKILL_KEY.list(params),
    queryFn: async (): Promise<AdminSkillsResponse> => {
      const { data } = await api.get("/admin/skills", { params });
      return data.data;
    },
    placeholderData: (previousData) => previousData,
    staleTime: 10 * 1000,
  });
};

export const useAdminCreateSkills = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: SkillFormInputs) => {
      const { data } = await api.post("/admin/skills", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SKILL_KEY.all });
    },
  });
};

export const useGetAdminSkillById = (id: string) => {
  return useQuery<ISkill>({
    queryKey: SKILL_KEY.byId(id),
    queryFn: async () => {
      const { data } = await api.get(`/admin/skills/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useUpdateAdminSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: SkillFormInputs;
    }) => {
      const { data } = await api.patch(`/admin/skills/${id}`, payload);
      return data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: SKILL_KEY.byId(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: SKILL_KEY.all,
      });
    },
  });
};
