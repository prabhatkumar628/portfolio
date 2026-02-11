import { createContext,  useContext } from "react";

interface AdminLayoutState {
  searchInput: string;
  globalSearch: string;
  handleSearchChange: (value: string) => void
  clearSearch: () => void;
}

export const AdminLayoutContext = createContext<AdminLayoutState | undefined>(
  undefined,
);

export const useAdminLayoutContext = () => {
  const context = useContext(AdminLayoutContext);
  if (!context) {
    throw new Error(
      "useAdminLayoutContext must be used inside AdminLayoutProvider",
    );
  }
  return context;
};
