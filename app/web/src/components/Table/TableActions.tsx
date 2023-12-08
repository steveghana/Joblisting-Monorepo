import { MRT_Row, MRT_TableInstance } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, People } from "@mui/icons-material";
import CustomButton from "../button";
import AlertDialog from "../Dialog";
import React from "react";
interface IActions<T> {
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  isDetails?: boolean;
  tableType?: "Shortlist" | "Interviewing";

  actionFn: (items: any) => void;
  handleOpenJobForm?: (id: string) => void;
  cancelInterview?: () => void;
  handleOpenInterviewForm?: (id: string) => void;
}
function TableActions<T>({
  row,
  table,
  actionFn,
  cancelInterview,
  handleOpenJobForm,
  handleOpenInterviewForm,
  tableType,
  isDetails,
}: IActions<T>) {
  const [open, setOpen] = React.useState(false);

  const [actionIndex, setActionIndex] = React.useState<any>({});

  const handleDialogOpen = (actionData?: any) => {
    setOpen(true);
    setActionIndex({ ...actionData });
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <AlertDialog
        deleteFn={() => actionFn(actionIndex.id)}
        handleClose={handleClose}
        open={open}
      />

      <Box sx={{ display: "flex", gap: ".2rem" }}>
        {tableType === "Shortlist" && (
          <Tooltip title="Schedule Interview">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleOpenInterviewForm(row.id);
              }}
            >
              <CustomButton
                sx={{ my: 2 }}
                variant="contained"
                text="Interview"
              />
            </IconButton>
          </Tooltip>
        )}
        {tableType === "Interviewing" && (
          <Tooltip title="Cancel Interview">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleOpenInterviewForm(row.id);
              }}
            >
              <CustomButton sx={{ my: 2 }} variant="contained" text="cancel" />
            </IconButton>
          </Tooltip>
        )}
        {isDetails && (
          <Tooltip title="add new job">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                handleOpenJobForm(row.id);
              }}
            >
              <CustomButton sx={{ my: 2 }} variant="contained" text="Add Job" />
            </IconButton>
          </Tooltip>
        )}
        <Box display={"flex"} justifyContent={"space-between"}>
          <Tooltip title="Edit">
            <IconButton
              // sx={{ minWidth: "50px" }}
              onClick={(e) => {
                e.stopPropagation();
                table.setEditingRow(row);
              }}
            >
              <Edit />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              // sx={{ minWidth: "50px" }}
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                handleDialogOpen(row.original);
              }}
            >
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </>
  );
}

export default TableActions;
