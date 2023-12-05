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
  useBulkDeleteApplicantMutation,
  useDeleteApplicantMutation,
  useGetApplicantsQuery,
  useUpdateApplicantMutation,
} from "../../../../store/services/applicationService";
import { useApplicantsColumns } from "../../../../hooks/useApplicantsColumn";
import AlertDialog from "../../../../components/Dialog";
import NoData from "../../../../components/NoData";
import { Grid, useMediaQuery, useTheme } from "@mui/material";
import FullscreenProgress from "../../../../components/FullscreenProgress/FullscreenProgress";
import { toast } from "react-toastify";
export const appliacantState = [
  "PendingShortlist",
  "Shortlisted",
  "Rejected",
  // "Accepted",
];
const ApplicantTable: React.FC<{ roleid: string }> = ({ roleid }) => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up("md"));

  const [validationErrors, setValidationErrors] = React.useState<
    Record<string, string | undefined>
  >({});

  const [
    bulkdeleteuser,
    {
      isError: isBulkDeletingError,
      isLoading: isBulkDeletingApplicant,
      error: bulkdeleteError,
    },
  ] = useBulkDeleteApplicantMutation();

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

  const defaultMRTOptions =
    getDefaultMRTOptions<ApplicantsSubmission>(matchUpMd);

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
      // console.log(row.original);
      refetch();
    },

    renderDetailPanel: ({ row }) => <TableDetail row={row} />,
    renderRowActions: ({ row, table }) => {
      /* I had to extract the row.original from the tab 
      actions comp as passing row directly to alert dialog 
      wasnt working because of event propagation issues*/
      return (
        <>
          {/* <AlertDialog
          /> */}
          <TableActions
            actionFn={async (items) => {
              // table.get
              const response = await deleteuser({ id: items });
              if (response) {
                refetch();
                toast.success("Action Successful", {
                  position: "bottom-center",
                });
              }
            }}
            row={row}
            table={table}
          />
        </>
      );
    },
    renderTopToolbar: ({ table }) => (
      <TopToolbar
        table={table}
        takeBulkAction={async (id) => {
          const response = await bulkdeleteuser({
            id,
          }).unwrap();
          if (response) {
            refetch();
            toast.success("Action Successful", {
              position: "bottom-center",
            });
          }
        }}
      />
    ),
    state: {
      isLoading:
        isAddingApplicant ||
        isUpdatingUser ||
        isDeletingUser ||
        isLoading ||
        isBulkDeletingApplicant,
      isSaving:
        isAddingApplicant || isUpdatingUser || isDeletingUser || isLoading,
      showAlertBanner:
        isCreatingError ||
        isUpdateingError ||
        isDeletingError ||
        isError ||
        isBulkDeletingError,
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
