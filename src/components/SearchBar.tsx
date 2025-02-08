import { debounce, TextField } from "@mui/material";
import { useState } from "react";

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [search, setSearch] = useState<string>('');
  
    const debouncedSearch = debounce((value: string) => {
      onSearch(value);
    }, 500);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      debouncedSearch(e.target.value);
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

  export default SearchBar