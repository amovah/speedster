import createBrowserHistory from 'history/createHashHistory';

const history = createBrowserHistory();

if (process.env.NODE_ENV === 'development') {
  global.myHistory = history;
}

export default history;
