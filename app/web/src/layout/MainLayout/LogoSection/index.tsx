import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// material-ui
import { Box, ButtonBase } from "@mui/material";
import LogoImg from "../../../assets/images/Logo-Small-19.png";
// project imports
import config from "../../../config";
import { MENU_OPEN } from "../../../store/actions";

// ==============================|| MAIN LOGO ||============================== //

const LogoSection = () => {
  const defaultId = useSelector((state: any) => state.customization?.defaultId);
  console.log(defaultId, "from log");
  const dispatch = useDispatch();
  return (
    <ButtonBase
      disableRipple
      onClick={() => dispatch({ type: MENU_OPEN, id: defaultId })}
      component={Link}
      to={config.defaultPath}
    >
      <img
        src={LogoImg}
        style={{ objectFit: "contain" }}
        alt="Logo"
        width={100}
        height={50}
      />
    </ButtonBase>
  );
};

export default LogoSection;
