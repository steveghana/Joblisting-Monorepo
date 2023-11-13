// TopToolbar.tsx
import React from "react";
import { Box, Button } from "@mui/material";
import { lighten } from "@mui/system";
import {
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from "material-react-table";
import { MaterialReactTable } from "material-react-table";

interface TopToolbarProps {
  table: MaterialReactTable<any>; // Change 'any' to the type of your table data
}

const TopToolbar: React.FC<TopToolbarProps> = ({ table }) => {
  const handleDeactivate = () => {
    table.getSelectedRowModel().flatRows.map((row: any) => {
      alert("deactivating " + row.getValue("name"));
    });
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
    <Box
      sx={(theme) => ({
        backgroundColor: lighten(theme.palette.background.default, 0.05),
        display: "flex",
        gap: "0.5rem",
        p: "8px",
        justifyContent: "space-between",
      })}
    >
      <Box sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <MRT_GlobalFilterTextField table={table} />
        <MRT_ToggleFiltersButton table={table} />
      </Box>
      <Box>
        <Box sx={{ display: "flex", gap: "0.5rem" }}>
          <Button
            color="error"
            disabled={!table.getIsSomeRowsSelected()}
            onClick={handleDeactivate}
            variant="contained"
          >
            Deactivate
          </Button>
          <Button
            color="success"
            disabled={!table.getIsSomeRowsSelected()}
            onClick={handleActivate}
            variant="contained"
          >
            Activate
          </Button>
          <Button
            color="info"
            disabled={!table.getIsSomeRowsSelected()}
            onClick={handleContact}
            variant="contained"
          >
            Contact
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TopToolbar;
