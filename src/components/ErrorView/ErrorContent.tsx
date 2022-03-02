import { makeStyles, Typography } from "@material-ui/core";
import { Config } from "../../config";
import * as React from "react";
import ErrorSvg from "./error.svg";
import { ErrorMessage } from "./ErrorMessage";

export const useStyles = makeStyles({
  wrapper: { padding: 30, textAlign: "center" },
  image: { height: 60 },
});

export interface Props {
  error: Error;
  helpMsg?: string;
}

export const ErrorContent: React.FC<Props> = ({ error, helpMsg }) => {
  const { wrapper, image } = useStyles();

  return (
    <div className={wrapper}>
      <img src={ErrorSvg} alt="Empty" className={image} />

      <Typography color="inherit" align="center" component="div">
        <Typography color="inherit" variant="h5" gutterBottom>
          Error
        </Typography>

        {helpMsg && <Typography color="inherit">{helpMsg}</Typography>}

        <Typography color="inherit" component="div">
          <ErrorMessage error={error} showStack={Config.DEBUG} />
        </Typography>
      </Typography>
    </div>
  );
};
