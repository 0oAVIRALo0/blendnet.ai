import { useState } from "react";

import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";

import SearchResult from "./SearchResult";

import api from "../api";

interface SearchResult {
  '1. symbol': string;
  '2. name': string;
}

const SearchBar = ({ onSelectAttendant }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const addSymbol = async (selectedSymbol: string) => {
    try {
      const res = await api.post("/api/watchlist/symbols/", { symbol: selectedSymbol });
      if (res.status === 201) {
        alert("Symbol added successfully");
      } else {
        alert("Error adding symbol");
      }
    } catch (err) {
      alert(err);
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${searchTerm}&apikey=demo`);
      const data = await response.json();
      console.log(data.bestMatches);
      setSearchResults(data.bestMatches);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }

    setLoading(false);
  };

  const handleSelectedSymbol = (symbol: SearchResult): void => {
    const selectedSymbol = symbol['1. symbol'];
    console.log("Selected symbol:", selectedSymbol);
    addSymbol(selectedSymbol);
    setSearchTerm('');
    setSearchResults([]);
  }

  return (
    <div className="w-50 m-5">
      <Typography variant="h5" gutterBottom>
        Search Stock Symbols
      </Typography>
      <div className="flex w-50">
        <TextField
          id="search-bar"
          className="text"
          variant="outlined"
          placeholder="Search for stock symbols..."
          size="small"
          value={searchTerm}
          onChange={handleChange}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="search"
                onClick={handleSubmit}
                edge="end"
              >
                <SearchIcon className="text-blue-500" />
              </IconButton>
            ),
          }}
          style={{ flex: 1 }}
        />
      </div>
      {searchResults.map((symbol) => (
        <MenuItem
          key={symbol['1. symbol']} 
          onMouseOver={() => console.log("Hovered over", symbol['2. name'])} 
        >
          <SearchResult
            symbol={symbol}
            onSelect={() => handleSelectedSymbol(symbol)}
          />
        </MenuItem>
      ))}
    </div>
  );
};

export default SearchBar;
