import React, { useMemo } from "react";
import { useClientColums } from "../../../../hooks/useColumns";
import { useCreateClient } from "../../../../hooks/useClientQuery";
import {
  // IColumnTypeString,
  handleCreate,
  handleSave,
  openDeleteConfirmModal,
} from "../../../../utils/ClientTableCrud";
import TableActions from "../../../../components/Table/TableActions";
import TopToolbar from "../../../../components/Table/topToolBar";
import CreatRow from "../../../../components/Table/CreatRow";

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
//Material UI Imports
import { Button } from "@mui/material";
import { clientData } from "../../../../lib/data/clientData";
import { IClient } from "../../../../types/client";
import { useNavigate } from "react-router";
import { getDefaultMRTOptions } from "../../../../components/Table/DefaultColumnOpt";
import {
  useGetClientsQuery,
  useUpdateClientMutation,
  useDeletClientMutation,
} from "../../../../store/services/ClientServce";
import AlertDialog from "../../../../components/Dialog";
import { toast } from "react-toastify";
interface IClientTableData {
  data: IClient[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: any;
}
const ClientTableData = ({
  data,
  isLoading,
  isFetching,
  isError,
  refetch,
}: IClientTableData) => {
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateClient();
  const [
    updateUser,
    {
      isError: isUpdateingError,
      isLoading: isUpdatingUser,
      error: updateError,
    },
  ] = useUpdateClientMutation();
  const [
    deleteuser,
    { isError: isDeletingError, isLoading: isDeletingUser, error: deleteError },
  ] = useDeletClientMutation();

  const [validationErrors, setValidationErrors] = React.useState<
    Record<string, string | undefined>
  >({});
  const [open, setOpen] = React.useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const navigate = useNavigate();

  const columns = useClientColums();

  const defaultMRTOptions = getDefaultMRTOptions<IClient>();

  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    // data,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,

    muiTableBodyCellProps: ({ row }) => ({
      onClick: (event) => {
        event.stopPropagation();
        console.info(row.id);
        navigate(`/dashboard/customers/clients/${row.id}`);
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: (item) =>
      handleCreate(item, createUser, setValidationErrors),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: (item) =>
      handleSave(item, updateUser, setValidationErrors),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <CreatRow
        internalEditComponents={internalEditComponents}
        row={row}
        table={table}
      />
    ),
    renderRowActions: ({ row, table }) => (
      <>
        <AlertDialog
          deleteFn={async () => {
            const response = await deleteuser({ id: row.original.id });
            if (response) {
              refetch();
              toast.success("Action Successful", {
                position: "bottom-center",
              });
            }
          }}
          handleClose={handleClose}
          open={open}
        />
        <TableActions
          row={row}
          table={table}
          onConfirmDelete={handleDialogOpen}
        />
      </>
    ),

    // renderTopToolbar: ({ table }) => <TopToolbar table={table} />,
    state: {
      isLoading: isLoading,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default ClientTableData;
