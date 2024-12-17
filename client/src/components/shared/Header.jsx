import {
  HoverCard,
  Group,
  Button,
  Text,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { GoChevronDown } from "react-icons/go";
import classes from "./Header.module.css";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserProfile from "./UserProfile";
import SearchBar from "./SearchBar";
import SearchBarSmall from "./SearchBarSmall";
import Logo from "./Logo";
import { FaArrowRight } from "react-icons/fa";

const categoryData = [
  {
    icon: "/icon/grocery.png",
    title: "Grocery",
    description: "Find a wide range of groceries to shop from.",
  },
  {
    icon: "/icon/sports.png",
    title: "Sports",
    description: "Shop for sports equipment and accessories tailored to you.",
  },
  {
    icon: "/icon/electronics.png",
    title: "Electronics",
    description: "Discover the latest gadgets and electronic devices.",
  },
  {
    icon: "/icon/fashion.png",
    title: "Fashion",
    description: "Shop for stylish and trendy clothing for all.",
  },
  {
    icon: "/icon/books.png",
    title: "Books",
    description:
      "Browse through a collection of fiction, non-fiction, and more.",
  },
  {
    icon: "/icon/home.png",
    title: "Home",
    description: "Find products for all your home essentials and décor.",
  },
];

export const Header = () => {
  const user = useSelector((state) => state.user);

  const pathname = useLocation().pathname;

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const header = document.querySelector(".header");
      if (window.scrollY > 100) {
        header.classList.add("!top-0");
        header.classList.add("shadow-lg");
      } else {
        header.classList.remove("!top-0");
        header.classList.remove("shadow-lg");
      }
    });
  }, []);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);

  const links = categoryData.map((item) => (
    <Link
      to={`/companies/categories?category=${item.title.toLowerCase()}`}
      className="!text-sm"
      key={item.title}
    >
      <div className="w-[100%] px-2 max-sm:hover:bg-none py-2 rounded-lg hover:bg-[#000088]/75 group flex items-center justify-start gap-2 font-['poppins'] ">
        <ThemeIcon size={34} variant="default" radius="md">
          <img style={{ width: rem(22), height: rem(22) }} src={item.icon} />
        </ThemeIcon>
        <div>
          <div className="text-sm font-['poppins'] font-[400] max-sm:text-sm group-hover:text-secondary transition-colors duration-150">
            {item.title}
          </div>
          <div className="text-sm max-sm:text-xs font-light group-hover:text-white/70 transition-colors duration-150">
            {item.description}
          </div>
        </div>
      </div>
    </Link>
  ));

  return (
    <div
      className={`sticky header border-neutral-300/50 border-b transition-all duration-300 ease-in ${
        pathname === "/" ? "-top-[12vh]" : "top-0 shadow-lg"
      } left-0 w-screen bg-white !font-['poppins'] !z-[98]`}
    >
      <header className={`md:px-[6vw] px-4 flex justify-between`}>
        <div className="nav-left flex items-center gap-4 max-sm:gap-2 ">
          <Logo />
          <div className="flex items-center justify-center">
            <SearchBar />
          </div>
        </div>

        <div className="nav-right flex gap-4 max-lg:gap-2 max-sm:gap-0 items-center justify-end ">
          <div className="links hidden lg:flex md:gap-6 gap-2 ">
            <Link
              to="/"
              className="link text-sm max-lg:text-xs transition-all duration-200 "
            >
              Home
            </Link>
            <HoverCard
              width={600}
              position="bottom"
              radius="md"
              shadow="md"
              withinPortal
            >
              <HoverCard.Target>
                <div className="link text-sm max-lg:text-xs transition-all duration-200 ">
                  <Center inline>
                    <Box component="span" mr={4}>
                      Categories
                    </Box>
                    <GoChevronDown
                      style={{ width: rem(16), height: rem(16) }}
                    />
                  </Center>
                </div>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <Group justify="space-between" px="md">
                  <Text fw={500}>Categories</Text>
                  <Link
                    to="/companies/categories"
                    className="text-xs text-blue-700 hover:underline "
                  >
                    View all
                  </Link>
                </Group>

                <Divider my="sm" />

                <div className="grid grid-cols-2 gap-2">{links}</div>

                <div className={classes.dropdownFooter}>
                  <Group justify="space-between">
                    <div>
                      <Text fw={500} fz="sm">
                        Get started
                      </Text>
                      <Text size="xs" c="dimmed">
                        A one stop destination for all your needs.
                      </Text>
                    </div>
                    <Link to="/companies/categories">
                      <Button variant="outline" color="primary.3">
                        Explore Now
                      </Button>
                    </Link>
                  </Group>
                </div>
              </HoverCard.Dropdown>
            </HoverCard>

            <Link
              to="/companies/add"
              className="link text-sm max-lg:text-xs transition-all duration-200 "
            >
              Listing
            </Link>

            <Link
              to={`${user && user?.name ? "/companies/advertise" : "/"}`}
              className={`link text-sm max-lg:text-xs transition-all duration-200   ${
                (!user || !user.name) && "text-gray-700/30 cursor-not-allowed"
              }`}
              onClick={(event) => {
                if (!user || !user.name) {
                  event.preventDefault();
                }
              }}
            >
              Advertise
            </Link>
          </div>

          <div className="flex gap-2 items-center justify-end">
            <SearchBarSmall />
            {user && user?.name ? (
              <div className="md:flex hidden">
                <UserProfile />
              </div>
            ) : (
              <Link to='/auth' className="md:flex hidden button group items-center gap-2 bg-accent/85 hover:bg-accent border  transition-all text-white duration-500 ease-in rounded-md hover:-translate-y-1 px-3 py-1">
                <p>Get Started</p>
                <span className="overflow-hidden transition-all duration-500 ease-in"><FaArrowRight /></span>
              </Link>
            )}
          </div>
          <div className="max-lg:flex hidden ">
            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
              className="ml-2"
            />
          </div>
        </div>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="80%"
        title={<Logo />}
        zIndex={100}
        className=""
      >
        <div className="links text-sm gap-4 overflow-y-auto px-4 flex h-[80dvh] flex-col justify-start">
          <Link to="/" className="font-['poppins'] " onClick={closeDrawer}>
            Home
          </Link>
          <div className="font-['poppins'] " onClick={toggleLinks}>
            <Center inline>
              <p className="font-['poppins'] ">Categories</p>
              <GoChevronDown
                style={{ width: rem(16), height: rem(16) }}
                className=""
              />
            </Center>
          </div>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Link
            to="/companies/add"
            className="font-['poppins']"
            onClick={closeDrawer}
          >
            Add Company
          </Link>
          <Link
            to={`${user && user?.name && "/companies/advertise"}`}
            className={` font-['poppins']  transition-colors duration-200 ${
              (!user || !user.name) && "text-gray-700 cursor-not-allowed"
            }`}
            onClick={closeDrawer}
          >
            Advertise
          </Link>
        </div>

        <div className="flex gap-1 items-center">
          {user && user?.name ? (
            <UserProfile expanded />
          ) : (
            <Link to='/auth' className="flex button group items-center gap-2 bg-accent/85 hover:bg-accent transition-all !text-white duration-300 rounded-md hover:-translate-y-1 px-3 py-1">
            <p>Get Started</p>
            <span className="overflow-hidden transition-all duration-500 ease-in "><FaArrowRight /></span>
          </Link>
          )}
        </div>
      </Drawer>
    </div>
  );
};
