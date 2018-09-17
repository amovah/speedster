import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import PropType from 'prop-types';
import Drawer from '@material-ui/core/Drawer';

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
        <Typography variant="title" color="inherit" noWrap>
          Permanent drawer
        </Typography>
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
      <div className={classes.toolbar} />
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
