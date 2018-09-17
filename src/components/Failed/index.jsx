import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';

import styles from './styles';

const Initializing = ({
  classes,
}) => (
  <div className={classes.root}>
    <Fragment>
      <Fade in timeout={600}>
        <Typography
          variant="display3"
          paragraph
          style={{
            color: 'white',
          }}
        >
          Failed at starting Aria2 :(
        </Typography>
      </Fade>
    </Fragment>
  </div>
);

Initializing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default styles(Initializing);
