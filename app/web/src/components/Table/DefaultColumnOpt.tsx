import { type MRT_RowData, type MRT_TableOptions } from "material-react-table";

//define re-useable default table options for all tables in your app
export const getDefaultMRTOptions = <TData extends MRT_RowData>(): Partial<
  MRT_TableOptions<TData>
> => ({
  //list all of your default table options here
  enableColumnFilterModes: true,
  createDisplayMode: "modal", //default ('row', and 'custom' are also available)
  editDisplayMode: "modal", //default ('row', 'cell', 'table', and 'custom' are also available)
  enableEditing: true,
  enableColumnOrdering: true,
  enableGrouping: true,
  enableColumnPinning: true,
  enableFacetedValues: true,
  enableRowActions: true,

  enableRowSelection: true,
  // enableRowSelection: (row: MRT_Row) => console.log('ite w'),
  initialState: { showColumnFilters: true, showGlobalFilter: true },
  paginationDisplayMode: "pages",
  positionToolbarAlertBanner: "bottom",

  muiSearchTextFieldProps: {
    size: "small",
    variant: "outlined",
  },
  muiPaginationProps: {
    color: "secondary",
    rowsPerPageOptions: [10, 20, 30],
    shape: "rounded",
    variant: "outlined",
  },
});