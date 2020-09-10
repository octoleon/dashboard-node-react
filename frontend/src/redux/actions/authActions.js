import { SET_AUTHENTICATED } from "../Types";

export const handleAuthenticated = authBool => {
  return {
    type: SET_AUTHENTICATED,
    payload: authBool
  };
};
