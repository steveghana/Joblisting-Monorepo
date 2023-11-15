import React, { useMemo } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  useClientColums,
  useColumns,
  useDevsColums,
} from "../../../../hooks/useColumns";
import {
  useCreateClient,
  useDeleteClient,
  useGetClients,
  useUpdateClient,
} from "../../../../hooks/useClientQuery";
import {
  // IColumnTypeString,
  handleCreate,
  handleSave,
  openDeleteConfirmModal,
} from "../../../../utils/ClientTableCrud";
import TableDetail from "../../../../components/Table/Detail";
import TableActions from "../../../../components/Table/TableActions";
import RowAction from "../../../../components/Table/RowAction";
import TopToolbar from "../../../../components/Table/topToolBar";
import CreatRow from "../../../../components/Table/CreatRow";
//MRT Imports
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//Material UI Imports
import { Button } from "@mui/material";
import { data } from "../../../../lib/data";
import { IColumnType } from "../../../../types/table";
import { IClient } from "../../../../types/client";
import { IDev } from "../../../../types/devs";
import { useNavigate } from "react-router";
import { getDefaultMRTOptions } from "../../../../components/Table/DefaultColumnOpt";

const ApplicantTable = () => {
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
  const defaultMRTOptions = getDefaultMRTOptions<IDev>();
  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    // data,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

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

    renderDetailPanel: ({ row }) => <TableDetail row={row} />,
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
export default ApplicantTable;
