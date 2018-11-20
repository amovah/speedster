import { withStyles } from '@material-ui/core/styles';

export default withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.secondary.light,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
