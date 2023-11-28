import React from "react";
import { IDev } from "../../types/devs";
import { MRT_Row, MRT_TableInstance } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, People } from "@mui/icons-material";
interface IActions<T> {
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  onConfirmDelete: () => void;
}
function TableActions<T>({ row, table, onConfirmDelete }: IActions<T>) {
  return (
    <Box sx={{ display: "flex", gap: ".5rem" }}>
      <Tooltip title="Delete">
        <IconButton
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            onConfirmDelete();
          }}
        >
          <Delete />
        </IconButton>
      </Tooltip>
    </Box>
  );
}

export default TableActions;
