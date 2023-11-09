import * as React from "react";
import {
  Box,
  BoxProps,
  IconButton,
  MenuItem,
  Select,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import FormatBoldRoundedIcon from "@mui/icons-material/FormatBoldRounded";
import FormatItalicRoundedIcon from "@mui/icons-material/FormatItalicRounded";
import FormatListBulletedRoundedIcon from "@mui/icons-material/FormatListBulletedRounded";
import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

export default function EditorToolbar({ sx, ...props }: BoxProps) {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      {...props}
      sx={[
        {
          display: "flex",
          my: 2,
          alignItems: "flex-end",
          gap: 0.5,
          "& > button": { "--Icon-fontSize": "16px" },
          flexDirection: {
            lg: "row",
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Select defaultValue="1" sx={{ minWidth: 160 }}>
        <MenuItem value="1">Normal text</MenuItem>
        <MenuItem value="2" sx={{ fontFamily: "code" }}>
          Code text
        </MenuItem>
      </Select>
      <Box>
        <IconButton size="small" color="default" sx={{ outline: "none" }}>
          <FormatBoldRoundedIcon />
        </IconButton>
        <IconButton size="small" color="default">
          <FormatItalicRoundedIcon />
        </IconButton>
        <IconButton size="small" color="default">
          <FormatListBulletedRoundedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export function LargeTextField() {
  const [text, setText] = useState("");
  const wordLimit = 300;
  const words = text.trim().split(/\s+/).filter(Boolean).length;

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <EditorToolbar />
      <TextareaAutosize
        minRows={1}
        style={{ width: "100%", minHeight: "150px", padding: 1 }}
        value={text}
        onChange={handleChange}
        placeholder="Enter your description here..."
      />
      <Typography
        variant="body2"
        color={words > wordLimit ? "error" : "textSecondary"}
      >
        {words} words ({wordLimit - words} words left)
      </Typography>
    </div>
  );
}
