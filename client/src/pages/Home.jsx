import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/shared/Header";

const Home = () => {
  return (
    <div className="flex flex-col items-start gap-8">
      <Header />
      <div className="h-[400vh]">
        <p>Home Page</p>
        <Link to="/admin">
          <Button>Link to Admin</Button>
        </Link>

        <Link to="/auth">
          <Button>Link to Auth</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
