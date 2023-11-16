import React from "react";
import { useDevsColums } from "../../hooks/useColumns";

import {
  // IColumnTypeString,
  handleCreate,
  handleSave,
  openDeleteConfirmModal,
} from "../../utils/ClientTableCrud";
import TableActions from "../../components/Table/TableActions";
import TopToolbar from "../../components/Table/topToolBar";
import CreatRow from "../../components/Table/CreatRow";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Button } from "@mui/material";
import { data } from "../../lib/data";
import { IDev } from "../../types/devs";
import { useNavigate } from "react-router";
import { getDefaultMRTOptions } from "../../components/Table/DefaultColumnOpt";
import {
  useAddDevMutation,
  useDeletDevMutation,
  useGetDevsQuery,
  useUpdateDevMutation,
} from "../../store/services/DevsService";

const DevTableData = () => {
  const [validationErrors, setValidationErrors] = React.useState<
    Record<string, string | undefined>
  >({});
  const {
    data: devs,
    isLoading,
    isFetching,
    isError,
    error,
    currentData,
  } = useGetDevsQuery();
  console.log(devs);

  const [createUser, { isLoading: isCreatingDev }] = useAddDevMutation();
  const [
    updateUser,
    { isError: isUpdatingError, isLoading: isUpdatingDev, error: updateError },
  ] = useUpdateDevMutation();
  const [
    deleteuser,
    { isError: isDeletingError, isLoading: isDeletingDev, error: deleteError },
  ] = useDeletDevMutation();
  const navigate = useNavigate();
  const columns = useDevsColums();

  const defaultMRTOptions = getDefaultMRTOptions<IDev>();
  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    // data,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    getRowId: (row) => row.email,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    muiSearchTextFieldProps: {
      size: "small",
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
      isLoading: isLoading,
      isSaving: isCreatingDev || isUpdatingDev || isDeletingDev,
      showAlertBanner: isError,
      showProgressBars: isFetching,
    },
  });

  return <MaterialReactTable table={table} />;
};

export default DevTableData;
