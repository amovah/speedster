import React, { Fragment } from 'react';
import {
  Typography,
  CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './styles';

const Initializing = ({
  classes,
}) => (
  <div className={classes.root}>
    <Fragment>
      <Typography
        variant="h2"
        paragraph
        style={{
          color: 'white',
        }}
      >
        Prepairing App For You!
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
  classes: PropTypes.object.isRequired,
};

export default styles(Initializing);
