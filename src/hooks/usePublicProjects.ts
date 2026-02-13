import { useQuery } from "@tanstack/react-query";
import { IProject } from "../models/project.model";
import { api } from "../lib/axios";

type PublicProjectParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?:string;
};

type PublicProjectResponseType = {
  projects: IProject[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProjects: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

const PROJECT_KEY = {
  list: (q: PublicProjectParams) => [
    "public",
    "projects",
    q.limit,
    q.page,
    q.search,
    q.category,
  ],
};

export const useGetPublicProjects = (params: PublicProjectParams) => {
  return useQuery({
    queryKey: PROJECT_KEY.list(params),
    queryFn: async (): Promise<PublicProjectResponseType> => {
      const { data } = await api.get("/public/projects", { params });
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
  });
};
