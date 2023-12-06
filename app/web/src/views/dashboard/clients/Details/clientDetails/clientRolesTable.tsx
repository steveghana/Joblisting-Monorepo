import React, { useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import TableActions from "../../../../../components/Table/TableActions";
import { IRoleData } from "../../../../../types/roles";
import { handleSave } from "../../../../../utils/ClientTableCrud";
import {
  useBulkDeletRoleMutation,
  useDeletRoleMutation,
  useUpdateRoleMutation,
} from "../../../../../store/services/roleService";
import { toast } from "react-toastify";
import { IClient } from "../../../../../types/client";
import TopToolbar from "../../../../../components/Table/topToolBar";
import JobDetails from "./jobDetails";
import { useClientRolesColumn } from "../../../../../hooks/useClientRolesColumn";

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
  const [deleteRole, { isLoading: isDeleteLoading, isError: isDeleteError }] =
    useDeletRoleMutation();
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