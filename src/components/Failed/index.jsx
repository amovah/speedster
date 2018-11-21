import React, { Fragment } from 'react';
import {
  Typography,
  Fade,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './styles';

const Initializing = ({
  classes,
}) => (
  <div className={classes.root}>
    <Fragment>
      <Fade in timeout={600}>
        <Typography
          variant="h2"
          paragraph
          style={{
            color: 'white',
          }}
        >
          Failed Gathering Will :(
        </Typography>
      </Fade>
    </Fragment>
  </div>
);

Initializing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default styles(Initializing);
