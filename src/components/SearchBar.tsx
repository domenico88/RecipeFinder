import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [search, setSearch] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    if (debouncedQuery || debouncedQuery === "") {
      onSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <TextField
      fullWidth
      label="Search Recipe"
      variant="outlined"
      value={search}
      onChange={handleChange}
      sx={{ marginBottom: 2 }}
    />
  );
};

export default SearchBar;
