// import { useRouter } from "next/navigation";
import React from "react";
// import { Session } from 'next-auth';
import { IRole, UserRoleSelection } from "../../types/roles";
import { useNavigate } from "react-router";
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRoleSelection;
}
// type SessionWithRole = Session & {
//   user: {
//     role: string; // Add the role property
//   };
// };
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  //TODO: change to cookie
  // Check if the user is not authenticated
  const session = localStorage.getItem("auth_token");
  const role = localStorage.getItem("role");
  const currentPageName = window.location.pathname.split("/").pop() || "";
  const router = useNavigate();
  React.useEffect(() => {
    console.log(currentPageName);
    const userRole = role as IRole;
    if (!session) {
      // Redirect to the login page or handle authentication as needed
      router("/");
    }
    if (
      !allowedRoles.includes(userRole)
      // !rolesToPages[userRole]?.includes(currentPageName)
    ) {
      // Redirect to an access denied page or handle unauthorized access
      router("/access-denied");
    }
  }, [session]);

  // If authenticated and has the correct role, render the children
  return <>{children}</>;
};
export const Protect =
  <P extends {}>(
    Component: React.ComponentType<P>,
    allowedRoles: UserRoleSelection
  ) =>
  (props: P) =>
    (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <Component {...props} />
      </ProtectedRoute>
    );
