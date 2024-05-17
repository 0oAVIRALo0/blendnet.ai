import React from "react";
import { SvgIconProps } from "@mui/material/SvgIcon";

export interface LinkItem {
  name: string;
  icon: React.ReactElement<SvgIconProps>;
}

export interface LinkGroup {
  title: string;
  links: LinkItem[];
}
