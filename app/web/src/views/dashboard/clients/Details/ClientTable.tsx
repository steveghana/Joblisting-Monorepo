import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TableRowAndColumns from "./clientColumns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ClientTableData from "./clientColumns";

const queryClient = new QueryClient();

const ClientTable = () => (
  <QueryClientProvider client={queryClient}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ClientTableData />
    </LocalizationProvider>
  </QueryClientProvider>
);

export default ClientTable;
