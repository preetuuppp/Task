import {
  ADD_TO_BOOKMARK,
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  REMOVE_FROM_BOOKMARK,
} from "./actionTypes";

const initialState = {
  userData: [],
  bookmarkedUsers: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_REQUEST:
      return {
        ...state,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        userData: payload,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
      };

    case ADD_TO_BOOKMARK:
      return {
        ...state,
        bookmarkedUsers: [...state.bookmarkedUsers, payload],
      };

    case REMOVE_FROM_BOOKMARK:
      return {
        ...state,
        bookmarkedUsers: state.bookmarkedUsers.filter(
          (user) => user.id !== payload
        ),
      };

    default:
      return state;
  }
};
export default reducer;
