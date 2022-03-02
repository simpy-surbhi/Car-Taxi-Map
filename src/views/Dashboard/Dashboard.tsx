import { Typography } from "@material-ui/core";
import * as React from "react";
import logo from "../../layouts/App/assets/dashboard_big.png";

export const Dashboard: React.FC = () => {
  return (
    <React.Fragment>
      <img src={logo} alt="logo" style={{ width: "100%", height: "100%" }} />
      <Typography
        variant="h3"
        gutterBottom
        style={{ textAlign: "center", margin: 10 }}
      >
        Get where you want, when you want with FREE NOW!
      </Typography>
      <Typography variant="body1" gutterBottom style={{ margin: 10 }}>
        We're proud to be the first ride-hailing service in London to bring
        black cabs and private hire vehicles together on one app, so you are
        free to choose from a range of vehicles and prices that work for you!
        <br />
        FREE NOW is Europe's number 1 taxi app, operating in 100+ European
        cities, including 9 cities within the UK. We are on a journey to make
        urban mobility better for passengers, drivers and communities, and to
        help cities move more freely. So sit back, relax and enjoy your journey
        with us.
      </Typography>
    </React.Fragment>
  );
};
