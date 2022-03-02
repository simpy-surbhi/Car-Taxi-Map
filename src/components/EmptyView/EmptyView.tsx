import { makeStyles, Typography } from '@material-ui/core';
import classNames from 'classnames';
import * as React from 'react';
import EmptySvg from './empty.svg';

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  hideImage?: boolean;
}

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 30,
  },
  image: {
    height: 60,
  },
  text: {
    textAlign: 'center',
  },
});

export const EmptyView: React.FC<Props> = ({
  hideImage = false,
  children = 'Nothing here yet.',
  className,
  ...rest
}) => {
  const { wrapper, text, image } = useStyles();

  return (
    <div className={classNames(wrapper, className)} {...rest}>
      {!hideImage && <img src={EmptySvg} alt="Empty" className={image} />}

      <Typography
        className={text}
        component={typeof children === 'string' ? 'p' : 'div'}
      >
        {children}
      </Typography>
    </div>
  );
};
