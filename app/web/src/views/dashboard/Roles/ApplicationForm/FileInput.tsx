import React, { useState, useRef } from "react";
import { Button, Typography, Box, styled, Grid } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { themePalette } from "../../../../themes/schemes/palette";
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));
const StylishFileInput = ({ onFileSelect, labelText }: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Specify type as HTMLInputElement | null

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    // onFileSelect(file);

    // Simulate an upload process (e.g., using a timeout)
    const simulateUpload = () => {
      let progress = 0;
      const interval = setInterval(() => {
        if (progress < 100) {
          progress += 5;
          setUploadProgress(progress);
        } else {
          clearInterval(interval);
          setSelectedFile(file);
        }
      }, 100);
    };

    // Start simulating the upload process
    simulateUpload();
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Box mt={2}>
      <Typography variant="h5">{labelText}</Typography>
      {selectedFile?.name && (
        <Box
          my={1}
          alignItems={"center"}
          borderRadius={4}
          // p={1}
          border={"2px solid rgba(0, 0, 0, 0.1)"}
          display={"flex"}
          // flexWrap={"wrap"}
          gap={2}
          width={"100%"}
          // flexWrap={"wrap"}
        >
          <Box
            display={"flex"}
            p={2}
            sx={{
              background: "red",
              height: "100%",
              borderBottomLeftRadius: 7,
              borderTopLeftRadius: 7,
            }}
          >
            <Box sx={{ height: "100%" }} /* width={"20%"} */>PDF</Box>
          </Box>
          <Box>
            <Typography>{selectedFile?.name}</Typography>
            <Typography>
              Last used on {new Date().toLocaleDateString()}
            </Typography>
          </Box>
        </Box>
      )}

      <Button
        color="error"
        variant="contained"
        sx={{ mt: 1, mb: 2, borderRadius: "10px", minWidth: "200px" }}
        startIcon={<AttachFileIcon />}
        onClick={handleUploadButtonClick}
      >
        Upload file
      </Button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf, .doc, .docx"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <Box>
        <small>Files Supported: PDF, TEXT, DOC, DOCX</small>
      </Box>
      {selectedFile && (
        <Box mt={2}>
          <LinearProgress
            sx={{ height: 10, borderRadius: 5 }}
            variant="determinate"
            value={uploadProgress}
          />
          <Typography variant="body2" color="textSecondary">
            {uploadProgress < 100 ? "Uploading..." : "Upload complete"}
          </Typography>
        </Box>
      )}

      {selectedFile && (
        <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
          {selectedFile.name}
        </Typography>
      )}
    </Box>
  );
};

interface Props {
  onFileSelect: (file: File | null) => void;
  labelText: string;
}

export default StylishFileInput;
