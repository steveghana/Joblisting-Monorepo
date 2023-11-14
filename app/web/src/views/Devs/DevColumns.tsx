import React, { useMemo } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  useClientColums,
  useColumns,
  useDevsColums,
} from "../../hooks/useColumns";
import {
  useCreateClient,
  useDeleteClient,
  useGetClients,
  useUpdateClient,
} from "../../hooks/useClientQuery";
import {
  // IColumnTypeString,
  handleCreate,
  handleSave,
  openDeleteConfirmModal,
} from "../../utils/ClientTableCrud";
import TableDetail from "../../components/Table/Detail";
import TableActions from "../../components/Table/TableActions";
import RowAction from "../../components/Table/RowAction";
import TopToolbar from "../../components/Table/topToolBar";
import CreatRow from "../../components/Table/CreatRow";
//MRT Imports
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//Material UI Imports
import { Button } from "@mui/material";
import { data } from "../../lib/data";
import { IColumnType } from "../../types/table";
import { IClient } from "../../types/client";
import { IDev } from "../../types/devs";
import { useNavigate } from "react-router";

const DevTableRowAndColumn = () => {
  const [validationErrors, setValidationErrors] = React.useState<
    Record<string, string | undefined>
  >({});
  const navigate = useNavigate();
  const columns = useDevsColums();
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateClient();
  //call READ hook
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetClients();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateClient();
  //call DELETE hook
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteClient();

  //CREATE action

  const table = useMaterialReactTable({
    columns,
    // data,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    createDisplayMode: "modal", //default ('row', and 'custom' are also available)
    editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
    enableEditing: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,

    enableRowSelection: true,
    // enableRowSelection: (row: MRT_Row) => console.log('ite w'),
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    getRowId: (row) => row.email,
    muiToolbarAlertBannerProps: isLoadingUsersError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiSearchTextFieldProps: {
      size: "small",
      variant: "outlined",
    },
    muiPaginationProps: {
      color: "secondary",
      rowsPerPageOptions: [10, 20, 30],
      shape: "rounded",
      variant: "outlined",
    },
    muiTableBodyCellProps: ({ row }) => ({
      onClick: (event) => {
        event.stopPropagation();
        console.info(row.id);
        navigate(`/management/profile/details/:${row.id}`);
      },
      sx: {
        cursor: "pointer", //you might want to change the cursor too when adding an onClick
      },
    }),

    // onRowSelectionChange: () => console.log("selected"),
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
      isLoading: isLoadingUsers,
      isSaving: isCreatingUser || isUpdatingUser || isDeletingUser,
      showAlertBanner: isLoadingUsersError,
      showProgressBars: isFetchingUsers,
    },
  });

  return <MaterialReactTable table={table} />;
};
const queryClient = new QueryClient();

const DevTableData = () => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DevTableRowAndColumn />
    </LocalizationProvider>
  </QueryClientProvider>
);
export default DevTableData;
