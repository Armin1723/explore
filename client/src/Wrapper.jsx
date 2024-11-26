import { Affix, Button, MantineProvider, rem, Transition } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/tiptap/styles.css";

import App from "./App";
import { useSelector } from "react-redux";
import { FaArrowUp } from "react-icons/fa";
import { useWindowScroll } from "@mantine/hooks";
import { useEffect } from "react";

const Wrapper = () => {
  const theme = useSelector((state) => state.theme);

  const [scroll, scrollTo] = useWindowScroll();

  return (
    <MantineProvider
      defaultColorScheme={theme}
      theme={{
        colors: {
          accent: [
            "#edf2ff",
            "#dbe7ff",
            "#bacfff",
            "#91b7ff",
            "#639eff",
            "#367cff",
            "#2b64cc",
            "#204b99",
            "#153266",
            "#0a1933",
          ],
          primary: [
            "#113c3d",
            "#0e3232",
            "#0a2929",
            "#063d3e",
            "#0f4c4c",
            "#116b6b",
            "#138a8a",
            "#14a9a9",
            "#1bc8c8",
            "#25d3d3",
            "#2de0e0",
          ],
          secondary: [
            "#f7f6f6",
            "#eaeaea",
            "#dcdcdc",
            "#cecece",
            "#c0c0c0",
            "#b2b2b2",
            "#a4a4a4",
            "#969696",
            "#888888",
            "#7a7a7a",
            "#6c6c6c",
          ],
          tertiary: [
            "#ed722a",
            "#d65e24",
            "#bc4b20",
            "#a4381c",
            "#9a3818",
            "#892e14",
            "#782614",
            "#68220e",
            "#5c1d0c",
            "#50250a",
            "#442006",
          ],
        },
        primaryColor: "accent",
      }}
    >
      <Notifications />
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <Button
              color="primary.1"
              leftSection={
                <FaArrowUp style={{ width: rem(16), height: rem(16) }} />
              }
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
            >
              Top
            </Button>
          )}
        </Transition>
      </Affix>
      <App />
    </MantineProvider>
  );
};

export default Wrapper;
