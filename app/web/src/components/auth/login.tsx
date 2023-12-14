import * as React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useLocation, useNavigate } from "react-router";
import FullscreenProgress from "../FullscreenProgress/FullscreenProgress";

function AuthCallBack() {
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    // Handle authentication callback logic here
    // Redirect the user to the main home page after handling the callback
    navigate("/dashboard/default");
  }, [location]);
  return (
    <>
      <FullscreenProgress />
    </>
  );
}
export default AuthCallBack;
