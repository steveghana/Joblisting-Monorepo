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
  MRT_TableOptions,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { getDefaultMRTOptions } from "../../../../components/Table/DefaultColumnOpt";
import { ApplicantsSubmission } from "../../../../types/roles";
import {
  useAddApplicantsMutation,
  useDeleteApplicantMutation,
  useGetApplicantsQuery,
  useUpdateApplicantMutation,
} from "../../../../store/services/applicationService";
import { useApplicantsColumns } from "../../../../hooks/useApplicantsColumn";
import AlertDialog from "../../../../components/Dialog";
import NoData from "../../../../components/NoData";
import { Grid } from "@mui/material";
import FullscreenProgress from "../../../../components/FullscreenProgress/FullscreenProgress";
import { toast } from "react-toastify";
const ApplicantTable: React.FC<{ roleid: string }> = ({ roleid }) => {
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
  const columns = useApplicantsColumns({
    validationErrors,
    setValidationErrors,
  });
  const {
    data: applicants,
    refetch,
    isError,
    isLoading,
    isFetching,
  } = useGetApplicantsQuery({ roleid });
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
    createDisplayMode: "row", //default ('row', and 'custom' are also available)
    editDisplayMode: "row",
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: (item) =>
      handleCreate(item, createApplicant, setValidationErrors),
    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: ({ values, table, row }) => {
      handleSave(values, { table, row }, updateUser, setValidationErrors);
      refetch();
    },

    renderDetailPanel: ({ row }) => <TableDetail row={row} />,
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
    renderTopToolbar: ({ table }) => <TopToolbar table={table} />,
    state: {
      isLoading:
        isAddingApplicant || isUpdatingUser || isDeletingUser || isLoading,
      isSaving:
        isAddingApplicant || isUpdatingUser || isDeletingUser || isLoading,
      showAlertBanner:
        isCreatingError || isUpdateingError || isDeletingError || isError,
      showProgressBars:
        isAddingApplicant || isUpdatingUser || isDeletingUser || isLoading,
    },
  });
  if (isLoading || isFetching) {
    return <FullscreenProgress />;
  }
  if (!applicants?.length) {
    return (
      // <Grid width={"100%"} display={"flex"} justifyContent={"center"}>
      <NoData />
    );
  }
  return <MaterialReactTable table={table} />;
};
export default ApplicantTable;
