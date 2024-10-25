import {
  Image,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
} from "@mantine/core";
import image from "../../assets/details.svg";
import classes from "./Details.module.css";
import { FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import './DetailsSection.css'; 

const DetailsSection = () => {
  return (
    <div id="home" className="relative w-full flex justify-center items-center py-16 overflow-hidden">
      {/* Blob Background */}
      <div className="absolute inset-0 z-0">
        <div className="blob bg-gradient-to-r from-teal-400 via-blue-400 to-purple-400 opacity-20 dark:opacity-30"></div>
      </div>

      {/* Main Content */}
      <div className={`${classes.inner} flex max-w-screen-lg relative z-10`}>
        <div className={classes.content}>
          <Title className={classes.title}>
            A <span className={classes.highlight}>Robust</span> Exploration
            Portal <br /> for all your needs.
          </Title>
          <Text c="dimmed" mt="md">
            Look for the best companies in your area, explore their services and
            products, and make an informed decision. Never worry about finding
            the right company for your needs again.
          </Text>

          <List
            mt={30}
            spacing="sm"
            size="sm"
            icon={
              <ThemeIcon size={20} radius="xl">
                <FaCheck
                  style={{ width: rem(12), height: rem(12) }}
                  stroke={1.5}
                />
              </ThemeIcon>
            }
          >
            <List.Item>
              <b>Varied Listings</b> – explore a wide range of companies and their services
            </List.Item>
            <List.Item>
              <b>Free Listing for your business</b> – list your business for free and reach out to more customers
            </List.Item>
            <List.Item>
              <b>Advertise for growth</b> – Advertise your business to reach out to more customers and endless possibilities.
            </List.Item>
          </List>

          <Group mt={30}>
            <Link to="/companies/add">
              <Button radius="xl" size="md" className={classes.control}>
                Get started
              </Button>
            </Link>
            <Link to="/auth">
              <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
              >
                Login
              </Button>
            </Link>
          </Group>
        </div>
        <Image src={image} className={`${classes.image} md:w-1/2`} />
      </div>
    </div>
  );
};

export default DetailsSection;
