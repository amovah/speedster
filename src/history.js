import createBrowserHistory from 'history/createHashHistory';
import changeActiveMenu from 'Root/actions/activeMenu/change';

const history = createBrowserHistory();

history.listen((location) => {
  changeActiveMenu(location.pathname);
});

if (process.env.NODE_ENV === 'development') {
  global.myHistory = history;
}

export default history;
