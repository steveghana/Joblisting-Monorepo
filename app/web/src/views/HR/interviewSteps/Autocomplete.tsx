import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import { styled, lighten, darken } from "@mui/system";
import {
  Avatar,
  Box,
  CircularProgress,
  IconButton,
  InputProps,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import { ContactPageOutlined, Contacts } from "@mui/icons-material";
import { IDev } from "../../../types/devs";

const GroupHeader = styled("div")(({ theme }) => ({
  position: "sticky",
  top: "-8px",
  padding: "4px 10px",
  color: theme.palette.primary.main,
  backgroundColor:
    theme.palette.mode === "light"
      ? lighten(theme.palette.primary.light, 0.85)
      : darken(theme.palette.primary.main, 0.8),
}));

const GroupItems = styled("ul")({
  padding: 0,
});
type IGroup = {
  label: string;
  data: IDev[];
} & InputProps;
function highlightOption(text, inputValue) {
  const regex = new RegExp(`(${inputValue})`, "gi");
  return text
    .split(regex)
    .map((part, index) =>
      regex.test(part) ? <b key={index}>{part}</b> : part
    );
}
export default function RenderGroup({ label, data, ...props }: IGroup) {
  const [open, setOpen] = React.useState(false);
  const [field, meta, helpers] = useField(props.name);

  //   const [options, setOptions] = React.useState<readonly Film[]>([]);
  const options = data.map((option) => {
    const firstLetter = option.firstName[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });
  const handleOnChange = (_, value) => {
    helpers.setValue(value);
  };
  const loading = open && options.length === 0;

  return (
    <Autocomplete
      //   {...field}
      //   {...props}
      id="grouped-demo"
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.firstLetter}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={(option) =>
        `${option.firstName || ""} ${option.lastName || ""}` || ""
      }
      onChange={handleOnChange}
      //   sx={{ width: 300 }}
      isOptionEqualToValue={(option, value) =>
        option.firstName === value.firstName
      }
      loading={loading}
      renderInput={(params) => (
        <TextField
          fullWidth
          {...params}
          label={label}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                <IconButton
                  onClick={() => {
                    setOpen(!open);
                  }}
                  size="small"
                >
                  <Contacts />
                </IconButton>
              </React.Fragment>
            ),
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => (
        <li {...props}>
          <Box display="flex" alignItems="center" gap={1}>
            <Avatar
              src={option.avatar || null}
              sx={{ width: 30, height: 30 }}
            />
            <Typography>
              {highlightOption(option.firstName, inputValue)}{" "}
              {highlightOption(option.lastName, inputValue)}
            </Typography>
          </Box>
        </li>
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
const topFilms = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  {
    title: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
];
