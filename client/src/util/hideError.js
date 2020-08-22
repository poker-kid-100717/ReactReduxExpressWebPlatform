import store from '../store';
import actions from '../store/actions/app';

export default () => { store.dispatch(actions.hideError()); }
