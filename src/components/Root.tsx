import AppProvider from "slices";
import App from "components/App/App";

const Root = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default Root;
