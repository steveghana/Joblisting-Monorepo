import * as React from "react";

// import Box, { BoxProps } from '@mui/joy/Box';
// import Select from '@mui/joy/Select';
// import MenuItem from '@mui/joy/MenuItem';
// import IconButton from '@mui/joy/IconButton';

import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { Box, BoxProps, IconButton, MenuItem, Select } from "@mui/material";

export default function EditorToolbar({ sx, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        {
          display: "flex",
          gap: 0.5,
          "& > button": { "--Icon-fontSize": "16px" },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Select size="sm" defaultValue="1" sx={{ minWidth: 160 }}>
        <MenuItem value="1">Normal text</MenuItem>
        <MenuItem value="2" sx={{ fontFamily: "code" }}>
          Code text
        </MenuItem>
      </Select>
      <IconButton size="sm" variant="plain" color="neutral">
        <FormatBoldRoundedIcon />
      </IconButton>
      <IconButton size="sm" variant="plain" color="neutral">
        <FormatItalicRoundedIcon />
      </IconButton>
      <IconButton size="sm" variant="plain" color="neutral">
        <StrikethroughSRoundedIcon />
      </IconButton>
      <IconButton size="sm" variant="plain" color="neutral">
        <FormatListBulletedRoundedIcon />
      </IconButton>
    </Box>
  );
}
