import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  FaHome,
  FaShoppingBasket,
  FaUtensils,
  FaLaptop,
  FaTshirt,
  FaBook,
  FaChevronDown,
} from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import classes from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";
import { IoIosTrendingUp } from "react-icons/io";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import UserProfile from "./UserProfile";
import ThemeToggle from "./ThemeToggle";

const categoryData = [
  {
    icon: FaShoppingBasket,
    title: "Grocery",
    description: "Find a wide range of groceries to shop from.",
  },
  {
    icon: FaUtensils,
    title: "Food",
    description: "Explore various food options available for delivery.",
  },
  {
    icon: FaLaptop,
    title: "Electronics",
    description: "Discover the latest gadgets and electronic devices.",
  },
  {
    icon: FaTshirt,
    title: "Fashion",
    description: "Shop for stylish and trendy clothing for all.",
  },
  {
    icon: FaBook,
    title: "Books",
    description:
      "Browse through a collection of fiction, non-fiction, and more.",
  },
  {
    icon: FaHome,
    title: "Home",
    description: "Find products for all your home essentials and décor.",
  },
];

export const Header = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const theme = useMantineTheme();

  const links = categoryData.map((item) => (
    <Link
      to={`/companies/categories?category=${item.title.toLowerCase()}`}
      key={item.title}
    >
      <UnstyledButton className={classes.subLink}>
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon
              style={{ width: rem(22), height: rem(22) }}
              color={theme.colors.blue[6]}
            />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Link>
  ));

  const { colorScheme } = useMantineColorScheme();

  return (
    <div
      w="100vw"
      align="center"
      className={`sticky top-0 w-screen bg-inherit !z-[98] backdrop-blur-xl border-b border-gray-500/50 ${
        colorScheme == "dark"
          ? "bg-zinc-900 text-white shadow-[0_0_25px_gray] shadow-gray-800/30"
          : "bg-white text-black"
      }`}
    >
      <header className={`${classes.header} py-4`}>
        <Group justify="space-between" h="100%" w="80%">
          <Link to="/" className="flex items-center gap-2">
            <div className="logo rounded-lg bg-gradient-to-br from-teal-400 to-teal-300 border-[1px] border-black/40 p-1">
              <IoIosTrendingUp className="text-2xl font-bold text-white" />
            </div>
            <p className="font-bold text-lg">Explore </p>
          </Link>

          <div className="nav-right flex">
            <Group h="100%" gap={0} visibleFrom="sm">
              <Link to="/" className={classes.link}>
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
                  <div className={classes.link}>
                    <Center inline>
                      <Box component="span" mr={5}>
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
                      to="/companies"
                      className="text-xs text-blue-700 hover:underline"
                    >
                      View all
                    </Link>
                  </Group>

                  <Divider my="sm" />

                  <SimpleGrid cols={2} spacing={0}>
                    {links}
                  </SimpleGrid>

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
                      <Link to="/companies">
                        <Button variant="default">Get started</Button>
                      </Link>
                    </Group>
                  </div>
                </HoverCard.Dropdown>
              </HoverCard>
              <Link to="/companies/add" className={classes.link}>
                Add Company
              </Link>
              <Link
                href="/companies/advertise"
                py="xs"
                className={`${classes.link} `}
              >
                Advertise
              </Link>
            </Group>

            <Group visibleFrom="sm" justify="space-between">
              {user && user?.name ? (
                <UserProfile />
              ) : (
                <>
                  <Button variant="default">
                    <Link to="/auth/login">Log in</Link>
                  </Button>
                  <Button>
                    <Link to="/auth/register">Sign Up</Link>
                  </Button>
                </>
              )}
            </Group>
          </div>

          <Group justify="center" hiddenFrom="sm">
            <ThemeToggle />

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              hiddenFrom="sm"
            />
          </Group>
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="80%"
        padding="md"
        fz={"h2"}
        title="Explore"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />

          <Link to="/" className={classes.link} onClick={closeDrawer}>
            Home
          </Link>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                Categories
              </Box>
              <FaChevronDown style={{ width: rem(16), height: rem(16) }} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Link
            to="/companies/add"
            className={classes.link}
            onClick={closeDrawer}
          >
            Add Company
          </Link>
          <Link
            to="/companies/advertise"
            py="xs"
            className={classes.link}
            onClick={closeDrawer}
          >
            Advertise
          </Link>

          <Divider my="sm" />

          <Group justify="center" grow pb="xl" px="md">
            {user && user?.name ? (
              <UserProfile />
            ) : (
              <>
                <Button variant="default">
                  <Link to="/auth/login">Log in</Link>
                </Button>
                <Button>
                  <Link to="/auth/register">Sign Up</Link>
                </Button>
              </>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </div>
  );
};
