import ProtectedRoute from "@/ListingApp/components/auth/requireAuth";

const AdminPage = () => {
  // Render the admin page content
  return <div>This is an admin-only page.</div>;
};

export default ProtectedRoute(AdminPage, ["admin"]);
