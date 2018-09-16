import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

import styles from './styles';

const Initializing = ({
  classes,
}) => (
  <div className={classes.root}>
    <Fragment>
      <Typography
        variant="display3"
        paragraph
        style={{
          color: 'white',
        }}
      >
        Give Me A Moment To Gather My Will!
      </Typography>
      <CircularProgress
        color="secondary"
        thickness={5}
        size={60}
      />
    </Fragment>
  </div>
);

Initializing.propTypes = {
  classes: PropTypes.shape({
    root: PropTypes.string.isRequired,
  }).isRequired,
};

export default styles(Initializing);
