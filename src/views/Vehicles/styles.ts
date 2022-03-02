import { makeStyles, alpha } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  grid: {
    maxHeight: 560,
    overflow: "auto",
  },

  applicationsToolbar: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 0,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
  paper: {
    marginBottom: 10,
  },
  iconButton: {
    marginRight: 20,
    pointerEvents: "auto",
  },
}));
