export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "[Auth] - SET_USER":
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
