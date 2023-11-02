import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  IconButton,
  Input,
  styled,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { CloudUpload } from "@mui/icons-material";
import Label from "../../../../components/Label";

const StylishFileInput = ({ onChange, labelText }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    onChange(file);
  };
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  return (
    <Box>
      <Typography variant="h5">Submit your Resume</Typography>
      <Button
        component="label"
        color="error"
        variant="contained"
        sx={{ mt: 1, mb: 2, borderRadius: "10px", minWidth: "200px" }}
        startIcon={<AttachFileIcon />}
      >
        Upload file
        <VisuallyHiddenInput
          onChange={handleFileChange}
          type="file"
          accept=".pdf, .doc, .docx" // Specify accepted file types
        />
      </Button>

      <Typography variant="body2" color="textSecondary">
        {selectedFile ? selectedFile.name : "No file selected"}
      </Typography>
    </Box>
  );
};

export default StylishFileInput;
