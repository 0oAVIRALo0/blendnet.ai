import React from "react";
import { LinkGroup } from "./types"; // Import the types

import HomeIcon from "@mui/icons-material/Home";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const links: LinkGroup[] = [
  {
    title: "Stock Info",
    links: [
      {
        name: "Home",
        icon: <HomeIcon />,
      },
    ],
  },
  {
    title: "Search Symbols",
    links: [
      {
        name: "Watchlist",
        icon: <GroupsIcon />,
      },
    ],
  },
];
