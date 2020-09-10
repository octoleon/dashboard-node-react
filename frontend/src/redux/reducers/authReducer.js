import { SET_AUTHENTICATED } from "../Types";

const initialState = {
  authenticated: false,
  token : ''
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        authenticated: action.payload.status,
        token : action.payload.token
      };
    default:
      return state;
  }
};

export default authReducer;
