import { MRT_ColumnDef } from "material-react-table";
import { useMemo } from "react";
import { IDev } from "../types/devs";
import { Avatar, Box } from "@mui/material";
import { AccountCircle, Send } from "@mui/icons-material";
import { IClient } from "../types/client";
import { validateEmail, validateRequired } from "../utils/tablevalidate";
import { IRoleData } from "../types/roles";
import { communicationOptions, whenToStart } from "../lib/data/formFieldData";
import { experienceLevel } from "../lib/data/data";
export const useClientColums = () => {
  return useMemo<MRT_ColumnDef<IClient>[]>(
    () => [
      {
        id: "clientinfo", //id used to define `group` column
        header: "Client Info",
        columns: [
          {
            accessorFn: (row) => `${row.name}`, //accessorFn used to join multiple data into a single cell
            id: "name", //id is still required when using accessorFn instead of accessorKey
            header: "Name",
            size: 250,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Avatar src={row.original.avatar} />

                {/* <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: "50%" }}
                /> */}
                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue || ""}</span>
              </Box>
            ),
          },
          {
            accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Email",
            size: 150,
          },
          {
            accessorKey: "phoneNumber", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Phone Number",
            size: 150,
          },
          {
            accessorKey: "countrylabel", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Country",
            size: 150,
          },
          {
            accessorKey: "developersLength", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: " Devs Assigned",
            size: 50,
          },
          {
            accessorKey: "rolesOpen", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            header: "Open Roles",
            size: 50,
          },
        ],
      },
      {
        id: "id",
        header: "Project Info",
        columns: [
          {
            accessorKey: "companyName",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "Company Name",
            size: 200,
          },
          {
            accessorKey: "projectTitle", //hey a simple column for once
            header: "Project Title",
            size: 350,
          },
          {
            accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
            id: "startDate",
            header: "Start Date",
            filterVariant: "date",
            filterFn: "lessThan",
            sortingFn: "datetime",
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: "250px",
              },
            },
          },
        ],
      },
    ],
    []
  );
};
export const useDevsColums = () => {
  return useMemo<MRT_ColumnDef<IDev>[]>(
    () => [
      {
        id: "employee", //id used to define `group` column
        header: "Employee",
        columns: [
          {
            accessorFn: (row) => `${row.firstName} ${row.lastName}`, //accessorFn used to join multiple data into a single cell
            id: "name", //id is still required when using accessorFn instead of accessorKey
            header: "Name",
            enableEditing: false,

            size: 200,
            Cell: ({ renderedCellValue, row }) => (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                {/* <img
                  alt="avatar"
                  height={30}
                  src={row.original.avatar}
                  loading="lazy"
                  style={{ borderRadius: "50%" }}
                /> */}
                <Avatar src={row.original.avatar} />

                {/* using renderedCellValue instead of cell.getValue() preserves filter match highlighting */}
                <span>{renderedCellValue}</span>
              </Box>
            ),
          },
          // {
          //   header: "Status",
          //   accessorFn: (originalRow) =>
          //     originalRow.isActive ? "true" : "false", //must be strings
          //   id: "isActive",
          //   filterVariant: "checkbox",
          //   Cell: ({ cell }) =>
          //     cell.getValue() === "true" ? "Active" : "Inactive",
          //   size: 170,
          // },
          {
            accessorKey: "email", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableEditing: false,

            filterVariant: "autocomplete",
            header: "Email",
            size: 100,
          },
          {
            id: "clientName",
            accessorKey: "clientName", //hey a simple column for once
            header: "Client Name",
            enableEditing: false,
            size: 200,
          },
          {
            id: "companyName",
            accessorKey: "companyName", //hey a simple column for once
            header: "Company Name",
            enableEditing: false,
            size: 200,
          },
          {
            accessorKey: "projectName", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            enableEditing: false,

            header: "Project Name",
            size: 150,
          },
        ],
      },
      {
        id: "id",
        header: "Job Info",
        columns: [
          // {
          //   accessorKey: "salary",
          //   // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
          //   filterFn: "between",
          //   header: "Salary",
          //   enableEditing: true,

          //   size: 100,
          //   //custom conditional format and styling
          //   Cell: ({ cell }) => (
          //
          //   ),
          // },
          {
            accessorKey: "salary",
            size: 100,

            header: "Salary",
            enableEditing: true,
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue<number>() < 50_000
                      ? theme.palette.error.dark
                      : cell.getValue<number>() >= 50_000 &&
                        cell.getValue<number>() < 75_000
                      ? theme.palette.warning.dark
                      : theme.palette.success.dark,
                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "9ch",
                  p: "0.25rem",
                })}
              >
                {cell.getValue<number>()?.toLocaleString?.("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </Box>
            ),
            // cell.getValue<number>().toLocaleString("en-US", {
            //   style: "currency",
            //   currency: "USD",
            // }),
            filterVariant: "range-slider",
            filterFn: "betweenInclusive", // default (or between)
            muiFilterSliderProps: {
              marks: true,
              max: 200_000, //custom max (as opposed to faceted max)
              min: 30_000, //custom min (as opposed to faceted min)
              step: 10_000,
              valueLabelFormat: (value) =>
                value.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                }),
            },
          },

          {
            accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
            id: "startDate",
            header: "Start Date",
            enableEditing: false,

            filterVariant: "date",
            filterFn: "lessThan",
            sortingFn: "datetime",
            Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            muiFilterTextFieldProps: {
              sx: {
                minWidth: "250px",
              },
            },
          },
        ],
      },
    ],
    []
  );
};
export const useClientRolesColumn = () => {
  return useMemo<MRT_ColumnDef<IRoleData>[]>(
    () => [
      {
        id: "employee", //id used to define `group` column
        header: "Role Info",
        columns: [
          {
            accessorFn: (row) => `${row.title}`, //accessorFn used to join multiple data into a single cell
            id: "title", //id is still required when using accessorFn instead of accessorKey
            header: "Title",
            enableEditing: true,

            size: 50,
          },
          {
            accessorKey: "communicationPreferences", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            enableEditing: true,
            editVariant: "select",
            editSelectOptions: communicationOptions.map((item) => item.label),

            filterVariant: "autocomplete",
            header: "Comm. Type",
            size: 50,
          },
          {
            id: "methodology",
            accessorKey: "methodology", //hey a simple column for once
            header: "Methodology",

            enableEditing: true,
            size: 50,
          },
          // {
          //   id: "whentostart",
          //   accessorKey: "whenToStart", //hey a simple column for once
          //   header: "When To Start",
          //   editVariant: "select",
          //   editSelectOptions: whenToStart.map((item) => item.label),

          //   enableEditing: true,
          //   size: 200,
          // },
          {
            accessorKey: "experience", //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: "autocomplete",
            enableEditing: true,
            editVariant: "select",
            editSelectOptions: experienceLevel.map((level) => level.label),

            header: "Exp Required",
            size: 50,
          },
        ],
      },
      {
        id: "id",
        header: "Job Info",
        columns: [
          {
            accessorKey: "vacancy_status",
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterFn: "between",
            header: "Vacancy Status",
            enableEditing: true,
            editVariant: "select",
            editSelectOptions: ["Open", "Closed"],
            size: 50,
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue<string>() === "Closed"
                      ? theme.palette.action.disabled
                      : theme.palette.success.light,

                  borderRadius: "0.25rem",
                  color: "#fff",
                  maxWidth: "9ch",
                  p: "0.25rem",
                })}
              >
                {cell.getValue<string>()}
              </Box>
            ),
          },

          //  {
          //    accessorFn: (row) => new Date(row.startDate), //convert to Date for sorting and filtering
          //    id: "startDate",
          //    header: "Start Date",
          //    enableEditing: false,

          //    filterVariant: "date",
          //    filterFn: "lessThan",
          //    sortingFn: "datetime",
          //    Cell: ({ cell }) => cell.getValue<Date>()?.toLocaleDateString(), //render Date as a string
          //    Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
          //    muiFilterTextFieldProps: {
          //      sx: {
          //        minWidth: "250px",
          //      },
          //    },
          //  },
        ],
      },
    ],
    []
  );
};
type ClientColumnsType =
  MRT_ColumnDef<IClient>[] /* specify the type returned by useClientColums */;
type DevColumnsType =
  MRT_ColumnDef<IDev>[] /* specify the type returned by useDevsColums */;

export function useColumns(columnType: "Client" | "Dev") {
  return columnType === "Client" ? useClientColums() : useDevsColums();
}
