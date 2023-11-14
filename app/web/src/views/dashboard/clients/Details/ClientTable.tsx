import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TableRowAndColumns from "./ClientColumns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ClientTableData from "./ClientColumns";

const queryClient = new QueryClient();

const ClientTable = () => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ClientTableData columnType="Client" />
    </LocalizationProvider>
  </QueryClientProvider>
);

export default ClientTable;
