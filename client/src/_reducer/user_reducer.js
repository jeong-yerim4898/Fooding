import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  CHANGE_USER_ADDRESS,
  CHANGE_SPOON_CNT,
} from '../_actions/types';

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGOUT_USER:
      return { ...state };
    case CHANGE_USER_ADDRESS:
      return {
        ...state,
        loginSuccess: {
          ...state.loginSuccess,
          address: action.payload,
        },
      };
    case CHANGE_SPOON_CNT:
      return {
        ...state,
        loginSuccess: {
          ...state.loginSuccess,
          spoon_cnt: action.payload,
        },
      };
    default:
      return state;
  }
}
