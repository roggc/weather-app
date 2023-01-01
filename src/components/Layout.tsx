import { PropsWithChildren } from "react";
import { Link, Outlet } from "@tanstack/react-router";
import styled from "styled-components";
import {
  useValues,
  useActions,
  theme,
  firebase,
  user,
  googleAccessToken,
} from "slices";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { useMediaQuery } from "react-responsive";
import { RESPONSIVE_BREAKPOINT } from "constants_";

const Layout = () => {
  const { theme: themeValue } = useValues(theme);

  const { setter } = useValues(googleAccessToken);

  const { app: firebaseApp } = useValues(firebase);

  const { user: userLoggedIn } = useValues(user);

  const {
    [theme]: { toggle },
    [user]: { set },
  } = useActions();

  const onSigninWithGoogle = () => {
    if (!firebaseApp) return;
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;

        setter(token);
        set(result.user);
      })
      .catch(({ message }) => console.error(message));
  };

  const onLogOut = () => {
    set(null);
    setter(null);
  };

  return (
    <Page>
      <Header>
        <HeaderLeft>
          <LinkContainer>
            <Link to="/" style={{ color: themeValue.colors.main }}>
              Home
            </Link>
          </LinkContainer>
          {!!userLoggedIn && (
            <LinkContainer>
              <Link to="/dashboard" style={{ color: themeValue.colors.main }}>
                Dashboard
              </Link>
            </LinkContainer>
          )}
        </HeaderLeft>
        <HeaderRight>
          <HeaderRightButton onClick={toggle}>switch theme</HeaderRightButton>
          {!!userLoggedIn ? (
            <HeaderRightButton onClick={onLogOut}>logout</HeaderRightButton>
          ) : (
            <HeaderRightButton onClick={onSigninWithGoogle}>
              sign in w/ google
            </HeaderRightButton>
          )}
        </HeaderRight>
      </Header>
      <Container>
        <LateralMenuComp>
          <LateralMenu></LateralMenu>
        </LateralMenuComp>
        <OutletContainer>
          <Outlet />
        </OutletContainer>
      </Container>
    </Page>
  );
};

const HeaderLeft = styled.div`
  display: flex;
`;

const HeaderRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Header = styled.div`
  height: var(--header-height);
  border-bottom: 1px solid ${({ theme }) => theme.colors.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--main-padding-container);
`;

const Page = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  color: ${({ theme }) => theme.colors.main};
  background-color: ${({ theme }) => theme.colors.secondary};
`;

const Container = styled.div`
  display: flex;
  flex-grow: 1;
`;

const LateralMenu = styled.div`
  padding: var(--main-padding-container);
  width: var(--lateral-menu-width);
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.main};
`;

const OutletContainer = styled.div`
  flex-grow: 1;
  padding: var(--main-padding-container);
`;

const LinkContainer = styled.div`
  margin-right: 10px;
`;

const LateralMenuComp = ({ children }: PropsWithChildren) => {
  const isNotMobileOrTablet = useMediaQuery({
    minWidth: RESPONSIVE_BREAKPOINT,
  });
  return isNotMobileOrTablet ? <>{children}</> : null;
};

const HeaderRightButton = styled.button`
  margin-left: 10px;
`;

export default Layout;
