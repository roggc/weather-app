import AppProvider from "../slices";
import App from "./App/App";

const Root = () => (
  <AppProvider>
    <App />
  </AppProvider>
);

export default Root;
