// TopToolbar.tsx
import React from "react";
import { Box, Button, IconButton, Tooltip, Typography } from "@mui/material";
import { lighten } from "@mui/system";
import {
  MRT_GlobalFilterTextField,
  MaterialReactTable,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { Delete } from "@mui/icons-material";
import AlertDialog from "../Dialog";

interface TopToolbarProps {
  table: any;
  takeBulkAction: (ids: string[]) => void; // Change 'any' to the type of your table data
  onConfirmDelete: (original?: any) => void;
  isDetails?: boolean;
  handleClose: () => void;
  openDialog: boolean;
  handleOpenJobForm?: (id: string) => void;
}

const TopToolbar: React.FC<TopToolbarProps> = ({
  table,
  takeBulkAction,
  handleClose,
  onConfirmDelete,
  openDialog,
  handleOpenJobForm,
}) => {
  const handleDeactivate = () => {
    // console.log(table.getSelectedRowModel().flatRows);
    const ids = table.getSelectedRowModel().flatRows.map((row: any) => row.id);
    takeBulkAction(ids);
    table.resetRowSelection(true);

    // console.log(table.setRowSelection());
  };

  const handleActivate = () => {
    table.getSelectedRowModel().flatRows.map((row: any) => {
      alert("activating " + row.getValue("name"));
    });
  };

  const handleContact = () => {
    table.getSelectedRowModel().flatRows.map((row: any) => {
      alert("contact " + row.getValue("name"));
    });
  };

  return (
    <>
      <AlertDialog
        deleteFn={handleDeactivate}
        handleClose={handleClose}
        open={openDialog}
      />
      <Box
        sx={(theme) => ({
          backgroundColor: lighten(theme.palette.background.default, 0.05),
          display: "flex",
          gap: "0.5rem",
          p: "8px",
          justifyContent: "space-between",
        })}
      >
        <Box>
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            {table.getIsSomeRowsSelected() && (
              <Box display={"flex"} gap={1} alignItems={"center"}>
                <Typography variant="overline" fontWeight={700}>
                  Bulk delete
                </Typography>
                <Tooltip title="Delete">
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      onConfirmDelete();
                    }}
                  >
                    <Delete fontSize="medium" />
                  </IconButton>
                </Tooltip>
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
          <MRT_GlobalFilterTextField table={table} />
          <MRT_ToggleFiltersButton table={table} />
        </Box>
      </Box>
    </>
  );
};

export default TopToolbar;
