import { createRoot } from "react-dom/client";
import "./index.css";

import { Provider } from "react-redux";
import store from "./redux/store";

import Wrapper from "./Wrapper.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ErrorBoundary>
      <Wrapper />
    </ErrorBoundary>
  </Provider>
);
