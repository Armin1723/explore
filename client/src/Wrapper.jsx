import { Affix, Button, MantineProvider, rem, Transition } from "@mantine/core";
import { notifications, Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/tiptap/styles.css";

import App from "./App";
import { useSelector } from "react-redux";
import { FaArrowUp } from "react-icons/fa";
import { useWindowScroll } from "@mantine/hooks";
import { HelmetProvider } from "react-helmet-async";
import { useEffect } from "react";
import { generateFCMToken, messaging } from "./notifications/firebase";
import { onMessage } from "firebase/messaging";

const Wrapper = () => {
  const theme = useSelector((state) => state.theme);

  const [scroll, scrollTo] = useWindowScroll();

  useEffect(() => {
    const tokenGenerateWrapper = async () =>{
      const token = await generateFCMToken();
      if(token) localStorage.setItem("fcm_token", token); 
    };
    tokenGenerateWrapper();
    
    onMessage(messaging, (payload) => {
      const image = <img src={payload.notification.image || '/favicon/android-chrome-192x192.png'} alt="notification" className="object-cover"/>;
      notifications.show({
        title: payload.notification.title,
        message: payload.notification.body,
        icon: image,
        color: "teal",
      });
    });
  },[]);

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
          brand:[
              "#e0e0ff",
               "#b3b3ff",
               "#8080ff",
               "#4d4dff",
               "#1a1aff",
               "#000085", // base
               "#000076",
               "#000066",
               "#000055",
               "#000033"
            
          ],
          primary: [
            "#103d3d",
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
      <HelmetProvider>
        <Notifications />
        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                color="primary.3"
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
      </HelmetProvider>
    </MantineProvider>
  );
};

export default Wrapper;
