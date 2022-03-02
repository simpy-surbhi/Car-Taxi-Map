import * as React from 'react';
import { Link, LinkProps } from 'react-router-dom';

export const RouterLink = React.forwardRef<HTMLAnchorElement, LinkProps>(
  (props, ref) => <Link innerRef={ref} {...props} />,
);
