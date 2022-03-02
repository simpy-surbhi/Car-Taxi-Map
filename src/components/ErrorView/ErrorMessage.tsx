import { Typography } from '@material-ui/core';
import * as React from 'react';
import { ErrorStack } from './ErrorStack';

interface Props {
  error: Error;
  showStack?: boolean;
}

export const ErrorMessage: React.FC<Props> = ({ error, showStack = false }) => (
  <React.Fragment>
    <Typography color="error" component="span">
      {error.message}
    </Typography>

    {showStack && error.stack && <ErrorStack stack={error.stack} />}
  </React.Fragment>
);
