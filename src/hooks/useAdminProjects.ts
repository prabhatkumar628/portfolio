import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import { ProjectFormInputs } from "../schemas/admin.project.schema";
import { IProject } from "../models/project.model";

type ProjectsGetParams = {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
  featured?: boolean | undefined;
  status?: string;
};

type ProjectResponseType = {
  projects: IProject[];
  publishedCount: number;
  featuredCount: number;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProjects: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
};

export const PROJECT_KEY = {
  all: ["admin", "projects"],
  list: (q: ProjectsGetParams) => [
    "admin",
    "projects",
    q.category,
    q.featured,
    q.limit,
    q.page,
    q.search,
    q.status,
  ],
  byId: (id: string) => ["admin", "projects", id],
};

export const useGetAdminProject = (params: ProjectsGetParams) => {
  return useQuery({
    queryKey: PROJECT_KEY.list(params),
    queryFn: async (): Promise<ProjectResponseType> => {
      const { data } = await api.get("/admin/projects", { params });
      return data.data;
    },
  });
};

export const useCreateAdminProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: ProjectFormInputs) => {
      const { data } = await api.post("/admin/projects", payload);
      return data.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_KEY.all,
      });
    },
  });
};

export const useUpdateAdminProjectById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      payload,
    }: {
      id: string;
      payload: ProjectFormInputs;
    }) => {
      const { data } = await api.patch(`/admin/projects/${id}`, payload);
      return data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: PROJECT_KEY.byId(variables.id),
      });
      queryClient.invalidateQueries({ queryKey: PROJECT_KEY.all });
    },
  });
};

export const useGETAdminProjectById = (id: string) => {
  return useQuery({
    queryKey: PROJECT_KEY.byId(id),
    queryFn: async (): Promise<IProject> => {
      const { data } = await api.get(`/admin/projects/${id}`);
      return data.data;
    },
  });
};

export const useDeleteAdminProjectById = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/admin/projects/${id}`);
      return data;
    },
    onSuccess: (_, id) => {
      queryClient.setQueryData<IProject[] | undefined>(
        PROJECT_KEY.all,
        (old) => {
          if (!old) return old;

          return old.filter((p) => p._id.toString() !== id);
        },
      );
      queryClient.removeQueries({
        queryKey: PROJECT_KEY.byId(id),
      });
    },
  });
};
