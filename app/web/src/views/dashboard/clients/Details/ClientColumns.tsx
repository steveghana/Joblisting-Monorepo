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
import { clientData } from "../../../../lib/clientData";
import { IClient } from "../../../../types/client";
import { useNavigate } from "react-router";
import { getDefaultMRTOptions } from "../../../../components/Table/DefaultColumnOpt";
import {
  useGetClientsQuery,
  useUpdateClientMutation,
  useDeletClientMutation,
} from "../../../../store/services/ClientServce";

const ClientTableData = () => {
  const { data, isLoading, isFetching, isError } = useGetClientsQuery();
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
  const navigate = useNavigate();

  const columns = useClientColums();

  const defaultMRTOptions = getDefaultMRTOptions<IClient>();

  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    // data,
    data: [], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    getRowId: (row) => row.email,
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
    // renderDetailPanel: ({ row }) => <TableDetail row={row} />,
    renderRowActions: ({ row, table }) => (
      <TableActions
        row={row}
        table={table}
        onConfirmDelete={() => openDeleteConfirmModal(row, updateUser)}
      />
    ),
    // renderRowActionMenuItems: ({ closeMenu }) => [
    //   ["View Profile", "Send Email"].map((action, index) => (
    //     <RowAction
    //       actionString={action}
    //       key={index}
    //       close={() => closeMenu()}
    //     />
    //   )),
    // ],
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        variant="contained"
        onClick={() => {
          table.setCreatingRow(true); //simplest way to open the create row modal with no default values
          //or you can pass in a row object to set default values with the `createRow` helper function
          // table.setCreatingRow(
          //   createRow(table, {
          //     //optionally pass in default values for the new row, useful for nested data or other complex scenarios
          //   }),
          // );
        }}
      >
        Create New User
      </Button>
    ),
    renderTopToolbar: ({ table }) => <TopToolbar table={table} />,
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
