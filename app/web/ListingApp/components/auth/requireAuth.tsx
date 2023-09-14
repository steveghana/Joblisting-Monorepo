// components/ProtectedRoute.tsx
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import rolesToPages from "../../../lib/roles"; // Import the roles-to-pages mapping
import React from "react";
import { Session } from "next-auth";
import { IRole } from "@/types/roles";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}
type SessionWithRole = Session & {
  user: {
    role: string; // Add the role property
  };
};
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const { data: session } = useSession();
  const router = useRouter();
  // Check if the user is not authenticated
  if (!session) {
    // Redirect to the login page or handle authentication as needed
    router.replace("/login");
    return null;
  }

  const sessionData = session as SessionWithRole;
  // Check if the user's role is allowed to access the current page
  const currentPageName = router.route.split("/").pop() ?? "";
  const userRole = sessionData.user.role as IRole;

  if (
    !allowedRoles.includes(userRole) ||
    !rolesToPages[userRole]?.includes(currentPageName)
  ) {
    // Redirect to an access denied page or handle unauthorized access
    router.replace("/access-denied");
    return null;
  }

  // If authenticated and has the correct role, render the children
  return <>{children}</>;
};
export default <P extends {}>(
    Component: React.ComponentType<P>,
    allowedRoles: string[]
  ) =>
  (props: P) => (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <Component {...props} />
    </ProtectedRoute>
  );
// export default ProtectedRoute;
