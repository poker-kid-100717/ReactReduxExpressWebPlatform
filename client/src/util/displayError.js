import store from '../store';
import actions from '../store/actions/app';

export default errorMessage => { store.dispatch(actions.showError(errorMessage)); }
