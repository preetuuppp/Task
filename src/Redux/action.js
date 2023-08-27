import axios from "axios";
import {
  ADD_TO_BOOKMARK,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  REMOVE_FROM_BOOKMARK,
} from "./actionTypes";

export const getuser = (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  axios
    .get("https://api.github.com/users")
    .then((res) => {
      dispatch({ type: GET_USER_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GET_USER_FAILURE, payload: err });
    });
};
export const addToBookmark = (item) => {
  return {
    type: ADD_TO_BOOKMARK,
    payload: item,
  };
};

export const removeFromBookmark = (itemId) => {
  return {
    type: REMOVE_FROM_BOOKMARK,
    payload: itemId,
  };
};
