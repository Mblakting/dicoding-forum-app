export const loadingBarReducer = (state = {}) => state;
export const showLoading = () => ({ type: 'SHOW_LOADING' });
export const hideLoading = () => ({ type: 'HIDE_LOADING' });
export const resetLoading = () => ({ type: 'RESET_LOADING' });
export function LoadingBar() {
  return null;
}

export default LoadingBar;
