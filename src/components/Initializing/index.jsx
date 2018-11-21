import React, { Fragment, Component } from 'react';
import {
  Typography,
  CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';

import startAria2 from 'Root/helpers/startAria2';
import history from 'Root/history';
import styles from './styles';

class Initializing extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }

  async componentDidMount() {
    try {
      await startAria2();
      history.push('/');
    } catch (e) {
      console.log(e);
      history.push('/failed');
    }
  }

  render() {
    const {
      classes,
    } = this.props;

    return (
      <div className={classes.root}>
        <Fragment>
          <Typography
            variant="h2"
            paragraph
            style={{
              color: 'white',
            }}
          >
            Gathering Will!
          </Typography>
          <CircularProgress
            color="secondary"
            thickness={5}
            size={60}
          />
        </Fragment>
      </div>
    );
  }
}

export default styles(Initializing);
