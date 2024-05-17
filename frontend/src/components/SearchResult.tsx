import React from 'react';
import { Card, CardContent, Typography } from '@mui/material'; // Importing MUI components

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
    <Card onClick={onSelect} style={{ cursor: 'pointer', marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h6">
          Symbol: <span>{symbol['1. symbol']}</span>
        </Typography>
        <Typography variant="h6">
          Name: <span>{symbol['2. name']}</span>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SearchResult;
