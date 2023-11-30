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
import { data } from "../../lib/data/data";
import { IDev } from "../../types/devs";
import { useNavigate } from "react-router";
import { getDefaultMRTOptions } from "../../components/Table/DefaultColumnOpt";
import {
  useAddDevMutation,
  useDeletDevMutation,
  useUpdateDevMutation,
} from "../../store/services/DevsService";
import AlertDialog from "../../components/Dialog";
import { toast } from "react-toastify";
type IDevTableData = {
  devs: IDev[];
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  refetch: () => void;
};
const DevTableData = ({
  devs,
  isLoading,
  isFetching,
  isError,
  refetch,
}: IDevTableData) => {
  const [validationErrors, setValidationErrors] = React.useState<
    Record<string, string | undefined>
  >({});

  console.log(data);
  const [open, setOpen] = React.useState(false);

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

  const handleDialogOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const defaultMRTOptions = getDefaultMRTOptions<IDev>();
  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    // data,
    data: devs, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    getRowId: (row) => row.id,
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
        navigate(`/management/profile/details/${row.id}`);
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
    onEditingRowSave: ({ values, table, row }) =>
      handleSave(
        { salary: values.salary || 0 },
        { table, row },
        updateUser,
        setValidationErrors
      ),
    renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
      <CreatRow
        internalEditComponents={internalEditComponents}
        row={row}
        table={table}
      />
    ),

    // renderDetailPanel: ({ row }) => <TableDetail row={row} />,
    renderRowActions: ({ row, table }) => (
      <>
        <AlertDialog
          deleteFn={async () => {
            const response = await deleteuser({
              id: row.original.id,
            }).unwrap();
            console.log(response, "frerekj");
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
