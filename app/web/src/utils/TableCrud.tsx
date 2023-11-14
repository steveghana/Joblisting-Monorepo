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
import { data } from "../lib/data";
import { IClient } from "../types/client";

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
export type IColumnTypeString = {
  Client: IClient;
  Dev: IDev;
};

type ITableProps = {
  item: {
    exitCreatingMode?: () => void;
    exitEditingMode?: () => void;
    row: MRT_Row<IClient>;
    table: MRT_TableInstance<IClient>;
    values: LiteralUnion<keyof IClient, any>; // Use keyof IT to get the keys of IClient or IDev
  };
};
interface IQuery {
  creatClient: UseMutateAsyncFunction<void, Error, IClient, void>;
  setValidationErrors: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
}

export const handleCreateClient = async (
  { values, table }: ITableProps["item"],
  createClient: IQuery["creatClient"],
  setValidationErrors: IQuery["setValidationErrors"]
) => {
  const newValidationErrors = validateUser(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }
  setValidationErrors({});
  await createClient(values as any);
  table.setCreatingRow(null);
};

export const handleSaveClient = async (
  { values, table }: ITableProps["item"],
  updateClient,
  setValidationErrors
) => {
  const newValidationErrors = validateUser(values);
  if (Object.values(newValidationErrors).some((error) => error)) {
    setValidationErrors(newValidationErrors);
    return;
  }
  setValidationErrors({});
  await updateClient(values);
  table.setEditingRow(null);
};

export const openDeleteConfirmModal = (row: any, deleteUser) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    deleteUser(row.original.email);
  }
};
