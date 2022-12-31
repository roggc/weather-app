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

const Layout = () => {
  const {
    [theme]: { theme: themeValue },
  } = useValues(theme);

  const {
    [googleAccessToken]: { setter },
  } = useValues(googleAccessToken);

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
          <button onClick={toggle}>switch theme</button>
          {!!userLoggedIn ? (
            <button onClick={onLogOut}>logout</button>
          ) : (
            <button onClick={onSigninWithGoogle}>sign in w/ google</button>
          )}
        </HeaderRight>
      </Header>
      <Container>
        <LateralMenu></LateralMenu>
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
  height: 3.75rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.main};
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  width: 180px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${({ theme }) => theme.colors.main};
  @media (max-width: 760px) {
    width: 0px;
    border-right-width: 0px;
  }
`;

const OutletContainer = styled.div`
  flex-grow: 1;
`;

const LinkContainer = styled.div`
  margin-right: 10px;
`;

export default Layout;
