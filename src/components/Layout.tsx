import { Link, Outlet } from "@tanstack/react-router";
import styled from "styled-components";
import { useValues, useActions, theme } from "../slices";

const Layout = () => {
  const {
    [theme]: { theme: themeValue },
  } = useValues(theme);
  const {
    [theme]: { toggle },
  } = useActions();
  return (
    <Container>
      <LateralMenu>
        <button onClick={toggle}>switch theme</button>
        <Link to="/" style={{ color: themeValue.colors.main }}>
          Home
        </Link>
        <Link to="/dashboard" style={{ color: themeValue.colors.main }}>
          Dashboard
        </Link>
      </LateralMenu>
      <StyledOutlet>
        <Outlet />
      </StyledOutlet>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  color: ${({ theme }) => theme.colors.main};
  background-color: ${({ theme }) => theme.colors.secondary};
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
