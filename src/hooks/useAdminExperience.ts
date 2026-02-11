import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IExperience } from "../models/experience.model";
import { api } from "../lib/axios";
import { ExperienceFormInputs } from "../schemas/admin.experience.schema";

export type FetchExperienceParams = {
  employmentType?: string;
  limit?: number;
  page?: number;
  search?: string;
};

export type ExperienceResponseType = {
  experiences: IExperience[];
  stats: {
    totalCount: number;
    fullTimeCount: number;
    partTimeCount: number;
    contractCount: number;
    freelanceCount: number;
    internshipCount: number;
    filterCount: number;
  };
  pagination: {
    totalPages: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    limit: number;
  };
};

const EXPERIENCE_KEY = {
  all: ["admin", "experience"],
  byId: (id: string) => ["admin", "experience", id],
  list: (q: FetchExperienceParams) => [
    "admin",
    "experience",
    q.employmentType,
    q.limit,
    q.page,
    q.search,
  ],
};

export const useGetAdminExperience = (params: FetchExperienceParams) => {
  return useQuery({
    queryKey: EXPERIENCE_KEY.all,
    queryFn: async (): Promise<ExperienceResponseType> => {
      const { data } = await api.get("/admin/experience", { params });
      return data.data;
    },
  });
};

export const useCreateAdminExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ExperienceFormInputs) => {
      const { data } = await api.post("/admin/experience", payload);
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_KEY.all });
    },
  });
};

export const useGetAdminExperienceById = (id: string) => {
  return useQuery({
    queryKey: EXPERIENCE_KEY.byId(id),
    queryFn: async ():Promise<IExperience> => {
      const { data } = await api.get(`/admin/experience/${id}`);
      return data.data;
    },
    enabled: !!id,
  });
};

export const useUpdateAdminExperienceById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: ExperienceFormInputs;
    }) => {
      const { data } = await api.patch(`/admin/experience/${id}`, payload);
      return data.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: EXPERIENCE_KEY.all });
      queryClient.invalidateQueries({queryKey:EXPERIENCE_KEY.byId(variables.id)})
    },
  });
};
