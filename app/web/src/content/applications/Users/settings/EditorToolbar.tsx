import * as React from "react";

import Box, { BoxProps } from "@mui/joy/Box";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import IconButton from "@mui/joy/IconButton";

import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import StrikethroughSRoundedIcon from "@mui/icons-material/StrikethroughSRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { useMediaQuery, useTheme } from "@mui/material";

export default function EditorToolbar({ sx, ...props }: BoxProps) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      {...props}
      sx={[
        {
          display: "flex",
          gap: 0.5,
          "& > button": { "--Icon-fontSize": "16px" },
          flexDirection: {
            lg: "row",
            md: "column",
            sm: "column",
            xs: "column",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Select size="sm" defaultValue="1" sx={{ minWidth: 160 }}>
        <Option value="1">Normal text</Option>
        <Option value="2" sx={{ fontFamily: "code" }}>
          Code text
        </Option>
      </Select>
      <Box>
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
    </Box>
  );
}