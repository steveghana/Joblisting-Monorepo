// Example.tsx
import React, { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import TopToolbar from "../../../../../components/Table/topToolBar";
import ExampleForm from "./exampleForm";
import {
  useCreateUser,
  useGetUsers,
  useUpdateUser,
  useDeleteUser,
} from "../../../../../hooks/useQury";
import { useColums } from "./useColumns";

const SomeExample = () => {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | undefined>
  >({});
  const { mutateAsync: createUser, isPending: isCreatingUser } =
    useCreateUser();
  const {
    data: fetchedUsers = [],
    isError: isLoadingUsersError,
    isFetching: isFetchingUsers,
    isLoading: isLoadingUsers,
  } = useGetUsers();
  const { mutateAsync: updateUser, isPending: isUpdatingUser } =
    useUpdateUser();
  const { mutateAsync: deleteUser, isPending: isDeletingUser } =
    useDeleteUser();

  const columns = useColums();
  const table = useMaterialReactTable({
    columns,
    data: fetchedUsers,
    enableColumnFilterModes: true,
    createDisplayMode: "modal",
    editDisplayMode: "modal",
    enableEditing: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: { showColumnFilters: true, showGlobalFilter: true },
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    getRowId: (row) => row.email,
    // Rest of your configuration
  });

  return (
    <QueryClientProvider client={new QueryClient()}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <>
          <TopToolbar table={table} />
          <ExampleForm
            validationErrors={validationErrors}
            setValidationErrors={setValidationErrors}
            createUser={createUser}
            isCreatingUser={isCreatingUser}
            updateUser={updateUser}
            isUpdatingUser={isUpdatingUser}
            deleteUser={deleteUser}
            table={table}
          />
          <MaterialReactTable table={table} />
        </>
      </LocalizationProvider>
    </QueryClientProvider>
  );
};

export default SomeExample;
