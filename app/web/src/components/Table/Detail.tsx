import { Box, Typography } from "@mui/material";
import { MRT_Row } from "material-react-table";
import React from "react";
import { IClient } from "../../types/client";

function TableDetail({ row }: { row: MRT_Row<IClient> }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <img
        alt="avatar"
        height={200}
        src={row.original.avatar}
        loading="lazy"
        style={{ borderRadius: "50%" }}
      />
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4">Signature Catch Phrase:</Typography>
        <Typography variant="h1">
          &quot;{row.original.signatureCatchPhrase}&quot;
        </Typography>
      </Box>
    </Box>
  );
}

export default TableDetail;
