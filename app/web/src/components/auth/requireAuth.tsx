// import { useRouter } from "next/navigation";
import rolesToPages from '../../lib/roles'; // Import the roles-to-pages mapping
import React from 'react';
// import { Session } from 'next-auth';
import { IRole } from '../../types/roles';
import { useNavigate } from 'react-router';
// import { IRole } from "@/types/roles";
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}
// type SessionWithRole = Session & {
//   user: {
//     role: string; // Add the role property
//   };
// };
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = []
}) => {
  //TODO: change to cookie
  const session = localStorage.getItem('auth_token');
  const role = localStorage.getItem('role');
  const router = useNavigate();
  // Check if the user is not authenticated
  if (!session) {
    // Redirect to the login page or handle authentication as needed
    router('/');
    return null;
  }

  const currentPageName = window.location.pathname.split('/').pop() || '';
  const userRole = role as IRole;
  console.log(
    currentPageName,
    userRole,
    rolesToPages[userRole],
    rolesToPages[userRole]?.includes(currentPageName)
  );
  if (
    !allowedRoles.includes(userRole) ||
    !rolesToPages[userRole]?.includes(currentPageName)
  ) {
    // Redirect to an access denied page or handle unauthorized access
    router('/access-denied');
    return null;
  }
  // If authenticated and has the correct role, render the children
  return <>{children}</>;
};
export default <P extends {}>(
    Component: React.ComponentType<P>,
    allowedRoles: string[]
  ) =>
  (props: P) =>
    (
      <ProtectedRoute allowedRoles={allowedRoles}>
        <Component {...props} />
      </ProtectedRoute>
    );
