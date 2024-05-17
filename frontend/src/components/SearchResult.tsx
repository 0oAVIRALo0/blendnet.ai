import React from 'react';
import { ListItem, ListItemText } from '@mui/material'; // Importing MUI components

interface User {
  Name: string;
}

interface SearchResultProps {
  symbol: {
    '1. symbol': string;
    '2. name': string;
  };
  onSelect: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({ symbol, onSelect }) => {
  return (
    <ListItem button onClick={onSelect} style={{ marginBottom: '10px' }}>
      <ListItemText
        primary={`Symbol: ${symbol['1. symbol']}`}
        secondary={`Name: ${symbol['2. name']}`}
      />
    </ListItem>
  );
};

export default SearchResult;
