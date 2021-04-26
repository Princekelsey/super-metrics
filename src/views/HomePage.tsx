import React from "react";
import { Login } from "../components/section/Login";

interface HomePageProps {}

const HomePage: React.FC<HomePageProps> = () => {
  return (
    <div className="main">
      <Login />
    </div>
  );
};

export default HomePage;
