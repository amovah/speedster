import history from 'Root/history';
import changeActiveMenu from 'Root/actions/activeMenu/change';

export default (page) => {
  history.push(page);

  changeActiveMenu(page);
};
