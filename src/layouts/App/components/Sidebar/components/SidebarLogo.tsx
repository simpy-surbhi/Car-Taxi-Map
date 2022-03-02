import { makeStyles, Typography } from "@material-ui/core";
import * as React from "react";
import logo from "../../../assets/logo_small.png";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  text: React.ReactNode;
}

const useStyles = makeStyles((theme) => ({
  logo: {
    position: "relative",
    padding: "15px 25px",
    zIndex: 4,
    margin: "20px 0px 0px 0px",
    display: "flex",
    alignItems: "center",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    fontSize: 18,
    textDecoration: "none",
    color: "inherit",
  },
  logoImage: {
    width: 180,
    marginLeft: theme.spacing(2.5),
  },
  logoText: {
    fontSize: 18,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

export const SidebarLogo: React.FC<Props> = ({ text, ...rest }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <div className={classes.logo} {...rest}>
        <img src={logo} alt="logo" className={classes.logoImage} />
      </div>
      <Typography
        color="inherit"
        variant="caption"
        style={{ zIndex: 1000, textAlign: "center" }}
      >
        {text}
      </Typography>
    </React.Fragment>
  );
};
