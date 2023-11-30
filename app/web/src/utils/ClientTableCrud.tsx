// ExampleForm.tsx
import React from "react";
import { DialogTitle, DialogContent, Box, Typography } from "@mui/material";
import {
  LiteralUnion,
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { validateUser } from "./tablevalidate";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { IDev } from "../types/devs";
import { data } from "../lib/data/data";
import { IClient } from "../types/client";
import { toast } from "react-toastify";

interface ExampleFormProps {
  validationErrors: Record<string, string | undefined>;
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
  createUser: any; // Change 'any' to the type of your createUser export function
  isCreatingUser: boolean;
  updateClient: any; // Change 'any' to the type of your updateClient export function
  isUpdatingUser: boolean;
  deleteUser: any; // Change 'any' to the type of your deleteUser export function
  table: any; // Change 'any' to the type of your table data
}

// const ExampleForm: React.FC<ExampleFormProps> = ({
//   validationErrors,
//   setValidationErrors,
//   createUser,
//   isCreatingUser,
//   updateClient,
//   isUpdatingUser,
//   deleteUser,
//   table,
// }) => {
// export type IColumnTypeString = {
//   Client: IClient;
//   Dev: IDev;
// };

// type ITableProps = {
//   item: {
//     exitCreatingMode?: () => void;
//     exitEditingMode?: () => void;
//     row: MRT_Row<IClient>;
//     table: MRT_TableInstance<IClient>;
//     values: LiteralUnion<keyof IClient, any>; // Use keyof IT to get the keys of IClient or IDev
//   };
// };
// interface IQuery {
//   creatClient: UseMutateAsyncFunction<void, Error, IClient, void>;
//   setValidationErrors: React.Dispatch<
//     React.SetStateAction<Record<string, string>>
//   >;
// }

export const handleCreate = async (
  { values, table },
  create,
  setValidationErrors
) => {
  const newValidationErrors = validateUser(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }
  setValidationErrors({});
  await create(values as any);
  table.setCreatingRow(null);
};

export const handleSave = async (
  values,
  { table, row },
  update,
  setValidationErrors
) => {
  console.log(values, row, "this is the valies");
  if (Object.keys(values)[0] === "salary") {
    const { salary } = values;
    const regex = /^\d+$/;

    if (!regex.test(salary)) {
      toast.error("Salary must be a number(s)", {
        position: "bottom-center",
      });
      return;
    }
  }
  // const newValidationErrors = validateUser(values);
  // if (Object.values(newValidationErrors).some((error) => error)) {
  //   setValidationErrors(newValidationErrors);
  //   return;
  // }
  setValidationErrors({});
  const response = await update({ ...values, id: row.id }).unwrap();
  console.log(response, "from respons");
  if (!response) return;
  toast.success("Applicant updated Successfully", {
    position: "bottom-center",
  });
  table.setEditingRow(null);
};

export const openDeleteConfirmModal = (row: any, deleteUser) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    deleteUser(row.original.email);
  }
};
