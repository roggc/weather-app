import { Link, Outlet } from "@tanstack/react-router";

const Layout = () => (
  <>
    <div>
      <Link to="/">Home</Link> <Link to="/dashboard">Dashboard</Link>
    </div>
    <hr />
    <Outlet />
  </>
);

export default Layout;
