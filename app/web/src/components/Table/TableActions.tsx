import { MRT_Row, MRT_TableInstance } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Delete, Edit, People } from "@mui/icons-material";
import CustomButton from "../button";
interface IActions<T> {
  row: MRT_Row<T>;
  table: MRT_TableInstance<T>;
  onConfirmDelete: () => void;
  isDetails?: boolean;
  handleOpenJobForm?: (id: string) => void;
}
function TableActions<T>({
  row,
  table,
  onConfirmDelete,
  handleOpenJobForm,
  isDetails,
}: IActions<T>) {
  return (
    <Box sx={{ display: "flex", gap: ".2rem" }}>
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
              onConfirmDelete();
            }}
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}

export default TableActions;
