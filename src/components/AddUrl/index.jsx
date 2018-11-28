import React, { Component, Fragment } from 'react';
import {
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import styles from './styles';

const AddUrl = ({
  classes,
}) => (
  <div className={classes.root}>
    <Paper>

      <Grid container spacing={24}>
        <Grid item xs={11}>
          <TextField
            requierd={1}
            label="URL"
            style={{ margin: '5px 20px' }}
            placeholder="URL"
            fullWidth
          />
        </Grid>

        <Grid item xs={8}>
          <TextField
            requierd={1}
            label="Destination"
            style={{ margin: '5px 20px' }}
            placeholder="Destination"
            fullWidth
            disabled
          />
        </Grid>

        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
          >
            Choose
          </Button>
        </Grid>

        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
          >
            Download
          </Button>
        </Grid>
      </Grid>

    </Paper>
  </div>
);

AddUrl.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default styles(AddUrl);
