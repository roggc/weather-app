import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "index.css";
import Root from "components/Root";
import reportWebVitals from "reportWebVitals";

const rootElement = document.getElementById("root");
if (!rootElement?.innerHTML) {
  const root = ReactDOM.createRoot(rootElement as HTMLElement);
  root.render(
    <StrictMode>
      <Root />
    </StrictMode>
  );
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
