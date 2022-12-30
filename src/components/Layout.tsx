import { Link, Outlet } from "@tanstack/react-router";
import styled from "styled-components";

const Layout = () => (
  <Container>
    <LateralMenu>
      <Link to="/">Home</Link> <Link to="/dashboard">Dashboard</Link>
    </LateralMenu>
    <StyledOutlet>
      <Outlet />
    </StyledOutlet>
  </Container>
);

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const LateralMenu = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.main};
`;

const StyledOutlet = styled.div`
  flex-grow: 1;
`;

export default Layout;
