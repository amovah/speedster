import { createHashHistory } from 'history';
import changeActiveMenu from 'Root/actions/activeMenu/change';

const history = createHashHistory();

history.listen((location) => {
  changeActiveMenu(location.pathname);
});

if (process.env.NODE_ENV === 'development') {
  global.myHistory = history;
}

export default history;
