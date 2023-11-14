import React from "react";
import { IDev } from "../../types/devs";
import { MRT_Row, MRT_TableInstance } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
interface IActions<T> {
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  onConfirmDelete: () => void;
}
function TableActions<T>({ row, table, onConfirmDelete }: IActions<T>) {
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
