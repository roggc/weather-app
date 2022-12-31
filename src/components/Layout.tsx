import { Link, Outlet } from "@tanstack/react-router";
import styled from "styled-components";
import { useValues, useActions, theme, firebase, user } from "slices";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const Layout = () => {
  const {
    [theme]: { theme: themeValue },
  } = useValues(theme);
  const { [firebase]: firebaseApp } = useValues(firebase);
  const { [user]: userLoggedIn } = useValues(user);
  const {
    [theme]: { toggle },
    [user]: { set },
  } = useActions();

  const onSigninWithGoogle = () => {
    if (!firebaseApp) return;
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then(({ user }) => set(user))
      .catch(({ message }) => console.error(message));
  };

  const onLogOut = () => {
    set(null);
  };

  return (
    <Container>
      <LateralMenu>
        <button onClick={toggle}>switch theme</button>
        {userLoggedIn ? (
          <button onClick={onLogOut}>logout</button>
        ) : (
          <button onClick={onSigninWithGoogle}>sign in w/ google</button>
        )}
        <Link to="/" style={{ color: themeValue.colors.main }}>
          Home
        </Link>
        <Link to="/dashboard" style={{ color: themeValue.colors.main }}>
          Dashboard
        </Link>
      </LateralMenu>
      <OutletContainer>
        <Outlet />
      </OutletContainer>
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

const OutletContainer = styled.div`
  flex-grow: 1;
`;

export default Layout;
