import { DialogActions, DialogContent, DialogTitle } from "@mui/material";
import {
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import React from "react";
import { IDev } from "../../types/client";
type ICreateRow = {
  table: MRT_TableInstance<IDev>;
  row: MRT_Row<IDev>;
  internalEditComponents: React.ReactNode[];
};
function CreatRow({ table, row, internalEditComponents }: ICreateRow) {
  return (
    <>
      <DialogTitle variant="h3">Create New User</DialogTitle>
      <DialogContent
        sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        {internalEditComponents} {/* or render custom edit components here */}
      </DialogContent>
      <DialogActions>
        <MRT_EditActionButtons variant="text" table={table} row={row} />
      </DialogActions>
    </>
  );
}

export default CreatRow;
