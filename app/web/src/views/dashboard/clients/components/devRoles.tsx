import { IDev } from '@/types/devs';
import { AssignmentLateTwoTone } from '@mui/icons-material';
import { Avatar, IconButton, TableBody, TableCell, TableRow, Tooltip, useTheme } from '@mui/material';
import { format } from 'date-fns';
interface IDevs {
  devs: IDev[];
}
const DevRow = ({ devs }: IDevs) => {
  const theme = useTheme();

  return (
    <TableBody>
      {devs.map((dev) => {
        // const startDateString = format(new Date(dev.startDate), 'dd MMMM, yyyy');
        // console.log(dev.stated);

        return (
          <TableRow key={dev.id} hover>
            <TableCell>
              <Avatar src={dev.avatar} />
            </TableCell>
            <TableCell>
              {dev.firstName} {dev.lastName}
            </TableCell>
            <TableCell>{dev.email}</TableCell>
            <TableCell>{dev.role}</TableCell>
            <TableCell>{'startDateString'}</TableCell>
            <TableCell align="right">
              <Tooltip placement="top" title="Unassign" arrow>
                <IconButton
                  sx={{
                    '&:hover': {
                      background: theme.colors?.error.lighter,
                    },
                    color: theme.palette.error.main,
                  }}
                  color="inherit"
                  size="small"
                >
                  <AssignmentLateTwoTone fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default DevRow;
