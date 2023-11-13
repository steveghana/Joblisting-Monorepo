import { AccountCircle, Send } from "@mui/icons-material";
import { ListItem, ListItemIcon, MenuItem } from "@mui/material";
interface IRowAction {
  close: () => void;
  actionString: string;
}
function RowAction({ close, actionString }: IRowAction) {
  const Profile = () => (
    <MenuItem key={0} onClick={close} sx={{ m: 0 }}>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      View Profile
    </MenuItem>
  );
  const Email = () => (
    <MenuItem key={1} onClick={close} sx={{ m: 0 }}>
      <ListItemIcon>
        <Send />
      </ListItemIcon>
      Send Email
    </MenuItem>
  );
  const ActionObj = {
    ["View Profile"]: <Profile />,
    ["Send Email"]: <Email />,
  };
  return <>{ActionObj[actionString]}</>;
}

export default RowAction;
