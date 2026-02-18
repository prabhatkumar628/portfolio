import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/axios";

interface AdminRecentMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface AdminRecentProject {
  _id: string;
  title: string;
  slug: string;
  isPublished: boolean;
  createdAt: string;
}

interface AdminStats {
  success: boolean;
  data: {
    unreadMessageCount: number;
    totalMessageCount: number;
    totalProjectsCount: number;
    thisMonthProjectsCount: number;
    totalClicks: number;
    thisMonthClicks: number;
    lastMonthClicks: number;
    recentMessages: AdminRecentMessage[];
    recentProjects: AdminRecentProject[];
  };
}

export const useGetAdminStats = () => {
  return useQuery<AdminStats>({
    queryKey: ["admin", "stats"],
    queryFn: async () => {
      const { data } = await api.get("/admin/stats");
      return data;
    },
    staleTime: 1000 * 60, // 1 minute cache
  });
};
