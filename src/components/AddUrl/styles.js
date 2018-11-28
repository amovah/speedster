import { withStyles } from '@material-ui/core/styles';

export default withStyles(theme => ({
  root: {
    padding: theme.spacing.unit * 3,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
}));
