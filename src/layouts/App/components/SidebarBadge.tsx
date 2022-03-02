import { Badge, makeStyles } from '@material-ui/core';
import { BadgeProps } from '@material-ui/core/Badge';
import * as React from 'react';

const useStyles = makeStyles((theme) => ({
  badgeRoot: {
    position: 'static',
  },
  badgeBadge: {
    top: theme.spacing(2.5),
    right: theme.spacing(2),
  },
}));

export const SidebarBadge: React.FC<Omit<BadgeProps, 'classes'>> = ({
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Badge
      {...rest}
      classes={{
        root: classes.badgeRoot,
        badge: classes.badgeBadge,
      }}
    >
      {children}
    </Badge>
  );
};
