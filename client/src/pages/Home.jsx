import { Button } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-start px-12 gap-8">
      <p>Home Page</p>
      <Link to="/admin">
        <Button>Link to Admin</Button>
      </Link>
    </div>
  );
};

export default Home;
