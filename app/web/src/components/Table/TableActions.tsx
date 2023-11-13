import React from "react";
import { IClient } from "../../types/client";
import { MRT_Row, MRT_TableInstance } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
interface IActions {
  row: MRT_Row<IClient>;
  table: MRT_TableInstance<IClient>;
  onConfirmDelete: () => void;
}
function TableActions({ row, table, onConfirmDelete }: IActions) {
  return (
    <Box sx={{ display: "flex", gap: "1rem" }}>
      <Tooltip title="Edit">
        <IconButton onClick={() => table.setEditingRow(row)}>
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={onConfirmDelete}>
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default TableActions;
