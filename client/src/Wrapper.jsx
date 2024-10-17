import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import App from "./App";
import { useSelector } from "react-redux";

const Wrapper = () => {
  const theme = useSelector((state) => state.theme.value);
  return (
    <MantineProvider
      defaultColorScheme={theme}
      theme={{
        colors: {
          accent: [
            '#edf2ff',  
            '#dbe7ff',  
            '#bacfff',  
            '#91b7ff',  
            '#639eff',  
            '#367cff',  
            '#2b64cc',  
            '#204b99',  
            '#153266',  
            '#0a1933', 
          ],
        },
        primaryColor: "accent", 
      }}
    >
      <App />
    </MantineProvider>
  );
};

export default Wrapper;
