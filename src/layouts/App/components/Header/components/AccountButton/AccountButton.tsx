import { Hidden, makeStyles } from "@material-ui/core";
import Button, { ButtonProps } from "@material-ui/core/Button";
import * as React from "react";

interface Props extends Omit<ButtonProps, "onClick"> {}

const useStyles = makeStyles((theme) => ({
  btnText: {
    marginLeft: theme.spacing(1),
  },
  popperClose: {
    pointerEvents: "none",
  },
  popperResponsive: {
    [theme.breakpoints.down("md")]: {
      ...theme.mixins.popperResponsive,
    },
  },
  dropdown: {
    ...theme.mixins.dropdown,
  },
  dropdownItem: {
    ...theme.mixins.dropdownItem,
  },
}));

export const AccountButton: React.FC<Props> = ({ ...rest }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Button onClick={() => {}}>
        <Hidden xsDown>
          <span className={classes.btnText}>{"Account"}</span>
        </Hidden>
      </Button>
    </React.Fragment>
  );
};
