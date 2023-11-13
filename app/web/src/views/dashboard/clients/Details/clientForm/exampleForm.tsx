// ExampleForm.tsx
import React from "react";
import { DialogTitle, DialogContent, Box, Typography } from "@mui/material";
import {
  LiteralUnion,
  MRT_EditActionButtons,
  MRT_Row,
  MRT_TableInstance,
} from "material-react-table";
import { validateUser } from "../../../../../lib/tablevalidate";
import {
  UseMutateAsyncFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { IClient } from "../../../../../types/client";
import { data } from "./data";

interface ExampleFormProps {
  validationErrors: Record<string, string | undefined>;
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string | undefined>>
  >;
  createUser: any; // Change 'any' to the type of your createUser export function
  isCreatingUser: boolean;
  updateUser: any; // Change 'any' to the type of your updateUser export function
  isUpdatingUser: boolean;
  deleteUser: any; // Change 'any' to the type of your deleteUser export function
  table: any; // Change 'any' to the type of your table data
}

// const ExampleForm: React.FC<ExampleFormProps> = ({
//   validationErrors,
//   setValidationErrors,
//   createUser,
//   isCreatingUser,
//   updateUser,
//   isUpdatingUser,
//   deleteUser,
//   table,
// }) => {
type ITableProps = {
  item: {
    exitCreatingMode: () => void;
    row: MRT_Row<IClient>;
    table: MRT_TableInstance<IClient>;
    values: Record<LiteralUnion<keyof IClient, string>, any>;
  };
};
interface IQuery {
  creatUser: UseMutateAsyncFunction<void, Error, IClient, void>;
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
}

export const handleCreateUser = async (
  { values, table }: ITableProps["item"],
  createUser: IQuery["creatUser"],
  setValidationErrors: IQuery["setValidationErrors"]
) => {
  const newValidationErrors = validateUser(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }
  setValidationErrors({});
  await createUser(values);
  table.setCreatingRow(null);
};

export const handleSaveUser = async (
  { values, table }: any,
  updateUser,
  setValidationErrors
) => {
  const newValidationErrors = validateUser(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }
  setValidationErrors({});
  await updateUser(values);
  table.setEditingRow(null);
};

export const openDeleteConfirmModal = (row: any, deleteUser) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    deleteUser(row.original.email);
  }
};
