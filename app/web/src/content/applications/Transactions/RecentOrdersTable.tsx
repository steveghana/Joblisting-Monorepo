import { FC, ChangeEvent, useState } from "react";
import { format } from "date-fns";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader,
  Grid,
  Button,
  Chip,
} from "@mui/material";

import Label from "../../../components/Label";
import { DevDetails, DevInterveiwStatus, DevStatus } from "./crypto_order";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import BulkActions from "./BulkActions";
import AddTwoToneIcon from "@mui/icons-material/AddTwoTone";

interface RecentOrdersTableProps {
  className?: string;
  devDetails: DevDetails[];
}

interface Filters {
  status?: DevInterveiwStatus;
}

const getDevStatusLabel = (DevStatus: DevInterveiwStatus): JSX.Element => {
  const map = {
    failed: {
      text: "Failed",
      color: "error",
    },

    completed: {
      text: "Completed",
      color: "success",
    },
    pending: {
      text: "Pending",
      color: "warning",
    },
  };

  const { text, color }: any = map[DevStatus];

  return <Label color={color}>{text}</Label>;
};
const getStatusLabel = (DevStatus: DevStatus): JSX.Element => {
  const map = {
    ["Not Active"]: {
      text: "Not Active",
      color: "error",
    },
    Active: {
      text: "Active",
      color: "success",
    },
  };

  const { text, color }: any = map[DevStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  devDetails: DevDetails[],
  filters: Filters
): DevDetails[] => {
  return devDetails.filter((devDetails) => {
    let matches = true;

    if (filters.status && devDetails.interviewStatus !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  devDetails: DevDetails[],
  page: number,
  limit: number
): DevDetails[] => {
  return devDetails.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ devDetails }) => {
  const [selectedDevDetails, setSelectedCryptoOrders] = useState<string[]>([]);
  const selectedBulkActions = selectedDevDetails.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    //@ts-ignore
    status: null,
  });

  const statusOptions = [
    {
      id: "all",
      name: "All",
    },
    {
      id: "completed",
      name: "Completed",
    },
    {
      id: "pending",
      name: "Pending",
    },
    {
      id: "failed",
      name: "Failed",
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== "all") {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleSelectAllCryptoOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoOrders(
      event.target.checked ? devDetails.map((devDetails) => devDetails.id) : []
    );
  };

  const handleSelectOneCryptoOrder = (
    event: ChangeEvent<HTMLInputElement>,
    cryptoOrderId: string
  ): void => {
    if (!selectedDevDetails.includes(cryptoOrderId)) {
      setSelectedCryptoOrders((prevSelected) => [
        ...prevSelected,
        cryptoOrderId,
      ]);
    } else {
      setSelectedCryptoOrders((prevSelected) =>
        prevSelected.filter((id) => id !== cryptoOrderId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoOrders = applyFilters(devDetails, filters);
  const paginatedDevDetails = applyPagination(
    filteredCryptoOrders,
    page,
    limit
  );
  const selectedSomeCryptoOrders =
    selectedDevDetails.length > 0 &&
    selectedDevDetails.length < devDetails.length;
  const selectedAllCryptoOrders =
    selectedDevDetails.length === devDetails.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      <Grid
        container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item>
          <Button
            sx={{ mt: { xs: 2, md: 0 }, borderRadius: "10px" }}
            variant="contained"
            startIcon={<AddTwoToneIcon fontSize="small" />}
          >
            Add a Developer
          </Button>
        </Grid>

        {!selectedBulkActions && (
          <CardHeader
            action={
              <Box width={150}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Int Status</InputLabel>
                  <Select
                    value={filters.status || "all"}
                    onChange={handleStatusChange}
                    label="Status"
                    autoWidth
                  >
                    {statusOptions.map((statusOption) => (
                      <MenuItem key={statusOption.id} value={statusOption.id}>
                        {statusOption.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            }
          />
        )}
      </Grid>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoOrders}
                  indeterminate={selectedSomeCryptoOrders}
                  onChange={handleSelectAllCryptoOrders}
                />
              </TableCell>
              <TableCell>Dev Details</TableCell>
              <TableCell>Dev ID</TableCell>
              <TableCell>Skills</TableCell>
              <TableCell align="right">WorkStatus</TableCell>
              <TableCell align="right">InterviewStatus</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDevDetails.map((devDetails) => {
              const isDevSelected = selectedDevDetails.includes(devDetails.id);
              return (
                <TableRow hover key={devDetails.id} selected={isDevSelected}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isDevSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoOrder(event, devDetails.id)
                      }
                      value={isDevSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {devDetails.devDetails}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary" noWrap>
                      {format(devDetails.date, "MMMM dd yyyy")}
                    </Typography> */}
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {devDetails.role}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {devDetails.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {devDetails.skills.slice(0, 3).map((skill) => (
                        <Chip label={skill} sx={{ m: 0.5 }} />
                      ))}
                      {devDetails.skills.length > 3 ? "..." : ""}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(devDetails.status)}
                  </TableCell>
                  <TableCell align="right">
                    {getDevStatusLabel(devDetails.interviewStatus)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit dev details" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors?.primary,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete dev " arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors?.error.lighter,
                          },
                          color: theme.palette.error.main,
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoOrders.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  devDetails: PropTypes.array.isRequired,
};

RecentOrdersTable.defaultProps = {
  devDetails: [],
};

export default RecentOrdersTable;
