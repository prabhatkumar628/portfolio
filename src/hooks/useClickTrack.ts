import { useMutation } from "@tanstack/react-query";
import { api } from "../lib/axios";

export type LinkType =
  | "liveDemoLink"
  | "githubFrontendLink"
  | "githubBackendLink"
  | "githubMobileLink";

type ClickTrackPayload = {
  projectId: string;
  linkType: LinkType;
};

export const useClickTrack = () => {
  return useMutation({
    mutationFn: async (payload: ClickTrackPayload) => {
      const { data } = await api.post("/public/projects/track-click", payload);
      return data;
    },
  });
};
