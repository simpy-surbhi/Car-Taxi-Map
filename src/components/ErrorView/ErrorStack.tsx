import { Typography } from '@material-ui/core';
import * as React from 'react';

export const ErrorStack: React.FC<{ stack: string }> = ({ stack }) => (
  <React.Fragment>
    <Typography color="inherit" variant="h6">
      Stack
    </Typography>

    <Typography
      color="inherit"
      component="pre"
      style={{
        maxHeight: 150,
        textAlign: 'left',
        overflow: 'auto',
      }}
    >
      {stack}
    </Typography>
  </React.Fragment>
);
