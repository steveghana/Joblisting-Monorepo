import React, { useMemo, useState } from "react";
import {
  MaterialReactTable,
  // createRow,
  type MRT_ColumnDef,
  type MRT_Row,
  type MRT_TableOptions,
  useMaterialReactTable,
} from "material-react-table";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  QueryClient,
  QueryClientProvider,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useClientRolesColumn } from "../../../../../hooks/useColumns";
import CustomButton from "../../../../../components/button";
import TableActions from "../../../../../components/Table/TableActions";
import AlertDialog from "../../../../../components/Dialog";
import { IRoleData } from "../../../../../types/roles";
import { getDefaultMRTOptions } from "../../../../../components/Table/DefaultColumnOpt";
import { handleCreate, handleSave } from "../../../../../utils/ClientTableCrud";
import {
  useBulkDeletRoleMutation,
  useDeletRoleMutation,
  useUpdateRoleMutation,
} from "../../../../../store/services/roleService";
import { toast } from "react-toastify";
import TableDetail from "../../../../../components/Table/Detail";
import { IClient } from "../../../../../types/client";
import TopToolbar from "../../../../../components/Table/topToolBar";
import JobDetails from "./jobDetails";

const ClientRoleTable = ({
  data,
  handleOpenJobForm,
  onActionComplete,
}: {
  data: IRoleData[];
  onActionComplete: () => void;

  handleOpenJobForm: (id: string) => void;
}) => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const [updateRole, { isLoading, isError }] = useUpdateRoleMutation();
  const [
    deleteRole,
    {
      isLoading: isDeleteLoading,
      isError: isDeleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeletRoleMutation();
  const [
    bulkdeleteuser,
    {
      isError: isBulkDeletingError,
      isLoading: isBulkDeleting,
      error: bulkdeleteError,
    },
  ] = useBulkDeletRoleMutation();
  const columns = useClientRolesColumn();
  const [open, setOpen] = React.useState(false);
  const [actionIndex, setActionIndex] = React.useState<IClient>();

  const handleDialogOpen = (actionData: any) => {
    setOpen(true);
    setActionIndex({ ...actionData });
  };

  const handleClose = () => {
    setOpen(false);
  };
  // const jobs = data.map((item) => item.jobs);
  const table = useMaterialReactTable({
    columns,
    data,
    createDisplayMode: "row", // ('modal', and 'custom' are also available)
    editDisplayMode: "modal", // ('modal', 'row', 'table', and 'custom' are also available)
    enableEditing: true,
    enableRowActions: true,
    renderDetailPanel: ({ row }) => <JobDetails jobs={row.original.jobs} />,

    getRowId: (row) => row.id,
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: (item) => {},
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: ({ values, table, row }) => {
      handleSave(values, { table, row }, updateRole, setValidationErrors);
      //   refetch();
    },
    renderTopToolbar: ({ table }) => (
      <TopToolbar
        table={table}
        takeBulkAction={async (id) => {
          // const response = await bulkdeleteuser({ id }).unwrap();
        }}
      />
    ),
    renderRowActions: ({ row, table }) => (
      /* I had to extract the row.original from the tab 
      actions comp as passing row directly to alert dialog 
      wasnt working or not getting the row data, but rather the last item in the array*/
      <TableActions
        actionFn={async () => {
          const response = await deleteRole({ id: actionIndex.id });
          if (response) {
            onActionComplete();
            toast.success("Action Successful", {
              position: "bottom-center",
            });
          }
        }}
        isDetails={true}
        handleOpenJobForm={() => handleOpenJobForm(row.id)}
        row={row}
        table={table}
      />
    ),
    state: {
      isLoading: isLoading || isDeleteLoading || isBulkDeleting,
      isSaving: isLoading || isDeleteLoading || isBulkDeleting,
      showAlertBanner: isError || isDeleteError || isBulkDeletingError,
      showProgressBars: isLoading || isDeleteLoading || isBulkDeleting,
    },
  });

  return <MaterialReactTable table={table} />;
};
export default ClientRoleTable;
