import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  Button,
  Divider,
  Tooltip,
} from '@material-ui/core';
import {
  Add,
  Timer,
} from '@material-ui/icons';
import PropType from 'prop-types';

import styles from './styles';

const CustomAppBar = ({
  classes,
  children,
}) => (
  <div className={classes.appFrame}>
    <AppBar
      position="absolute"
      className={`${classes.appBar} ${classes['appBar-left']}`}
    >
      <Toolbar>
        <Tooltip title="Add URL">
          <Button color="inherit">
            <Add />
          </Button>
        </Tooltip>
        <Tooltip title="Manage Queues">
          <Button color="inherit">
            <Timer />
          </Button>
        </Tooltip>
      </Toolbar>
    </AppBar>
    <Drawer
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
      className={classes.drawerContainer}
    >
      <div className={classes.toolbar}>
        <Typography
          variant="h6"
        >
          Speedster
        </Typography>
      </div>
      <Divider />
    </Drawer>
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  </div>
);

CustomAppBar.defaultProps = {
  children: () => null,
};

CustomAppBar.propTypes = {
  classes: PropType.object.isRequired,
  children: PropType.node,
};

export default styles(CustomAppBar);
