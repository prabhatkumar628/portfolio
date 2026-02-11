import { ReactNode, useState } from "react";
import { AdminLayoutContext } from "./AdminLayoutContext";
import { useDebounceCallback } from "usehooks-ts";

export const AdminLayoutProvider = ({ children }: { children: ReactNode }) => {
  const [searchInput, setSearchInput] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");

  const debouncedSearch = useDebounceCallback((value: string) => {
    setGlobalSearch(value);
  }, 2000);

  const handleSearchChange = (value: string) => {
    setSearchInput(value); // instant typing
    debouncedSearch(value); // delayed API value
  };

  const clearSearch = () => {
    setSearchInput("");
    setGlobalSearch("");
    debouncedSearch.cancel(); // very important
  };

  return (
    <AdminLayoutContext.Provider
      value={{
        searchInput,
        globalSearch,
        handleSearchChange,
        clearSearch,
      }}
    >
      {children}
    </AdminLayoutContext.Provider>
  );
};
