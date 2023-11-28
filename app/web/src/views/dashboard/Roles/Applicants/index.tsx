import React from "react";
import {
  // IColumnTypeString,
  handleCreate,
  handleSave,
} from "../../../../utils/ClientTableCrud";
import TableDetail from "../../../../components/Table/Detail";
import TableActions from "../../../../components/Table/TableActions";
import TopToolbar from "../../../../components/Table/topToolBar";
//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getDefaultMRTOptions } from "../../../../components/Table/DefaultColumnOpt";
import { ApplicantsSubmission } from "../../../../types/roles";
import {
  useAddApplicantsMutation,
  useDeleteApplicantMutation,
  useUpdateApplicantMutation,
} from "../../../../store/services/applicationService";
import { useApplicantsColumns } from "../../../../hooks/useApplicantsColumn";
import AlertDialog from "../../../../components/Dialog";
import NoData from "../../../../components/NoData";
import { Grid } from "@mui/material";
const ApplicantTable: React.FC<{ applicants: ApplicantsSubmission[] }> = ({
  applicants,
}) => {
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
  const columns = useApplicantsColumns();
  const [
    createApplicant,
    { isError: isCreatingError, isLoading: isAddingApplicant },
  ] = useAddApplicantsMutation();
  const [updateUser, { isError: isUpdateingError, isLoading: isUpdatingUser }] =
    useUpdateApplicantMutation();
  const [deleteuser, { isError: isDeletingError, isLoading: isDeletingUser }] =
    useDeleteApplicantMutation();

  const defaultMRTOptions = getDefaultMRTOptions<ApplicantsSubmission>();
  const table = useMaterialReactTable({
    ...defaultMRTOptions,
    columns,
    data: applicants || [], //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    getRowId: (row) => row.id,
    muiToolbarAlertBannerProps:
      isAddingApplicant || isUpdatingUser || isDeletingUser
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
      handleCreate(item, createApplicant, setValidationErrors),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: (item) =>
      handleSave(item, updateUser, setValidationErrors),
    // renderCreateRowDialogContent: ({ table, row, internalEditComponents }) => (
    //   <CreatRow
    //     internalEditComponents={internalEditComponents}
    //     row={row}
    //     table={table}
    //   />
    // ),

    renderDetailPanel: ({ row }) => <TableDetail row={row} />,
    renderRowActions: ({ row, table }) => (
      <>
        <AlertDialog
          deleteFn={() => deleteuser({ id: row.original.id })}
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
    renderTopToolbar: ({ table }) => <TopToolbar table={table} />,
    state: {
      isLoading: isAddingApplicant || isUpdatingUser || isDeletingUser,
      isSaving: isAddingApplicant || isUpdatingUser || isDeletingUser,
      showAlertBanner: isCreatingError || isUpdateingError || isDeletingError,
      showProgressBars: isAddingApplicant || isUpdatingUser || isDeletingUser,
    },
  });
  if (!applicants.length) {
    return (
      <Grid width={"100vw"}>
        <NoData />
      </Grid>
    );
  }
  return <MaterialReactTable table={table} />;
};
export default ApplicantTable;
