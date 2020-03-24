import {
  CREATE_POST,
  FETCH_POST,
  SHOW_LOADER,
  HIDE_LOADER,
  SHOW_ALERT,
  HIDE_ALERT
} from './types';

export function createPost(post) {
  return {
    type: CREATE_POST,
    payload: post
  };
}

export function showLoading() {
  return {
    type: SHOW_LOADER
  };
}

export function hideLoading() {
  return {
    type: HIDE_LOADER
  };
}

export function showAlert(text) {
  return dispatch => {
    dispatch({
      type: SHOW_ALERT,
      payload: text
    });

    setTimeout(() => {
      dispatch(hideAlert());
    }, 3000);
  };
}

export function hideAlert() {
  return {
    type: HIDE_ALERT
  };
}

export function fetchPosts() {
  return async dispatch => {
    try {
      dispatch(showLoading());
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/posts?_limit=5'
      );
      const json = await response.json();
      dispatch({ type: FETCH_POST, payload: json });
      dispatch(hideLoading());
    } catch (e) {
      dispatch(showAlert('Что-то пошло не так...'));
      dispatch(hideLoading());
    }
  };
}
