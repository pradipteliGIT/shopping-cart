import userTypes from './user.types';

export const emailSignInStart = userCredentials => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const signInSuccess = user => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const signUpUserStart = userCredentials => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials,
});

export const userErrors = errors => ({
  type: userTypes.USER_ERRORS,
  payload: errors,
});

export const resetPasswordStart = userCredentials => ({
  type: userTypes.RESET_PASSWORD_START,
  payload: userCredentials,
});

export const resetPasswordSuccess = () => ({
  type: userTypes.RESET_PASSWORD_SUCCESS,
  payload: true,
});

export const resetUserState = () => ({
  type: userTypes.RESET_USER_STATE,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});
// =======================================================================//
// ===========================OLD CODE====================================//
// =======================================================================//
// export const setCurrentUser = user => ({
//   type: userTypes.SET_CURRENT_USER,
//   payload: user,
// });

// export const resetAllFormValues = () => ({
//   type: userTypes.RESET_FORM_VALUES,
// });

// export const signInUser = ({ email, password }) => async dispatch => {
//   try {
//     await auth.signInWithEmailAndPassword(email, password);
//     dispatch({
//       type: userTypes.SIGN_IN_SUCCESS,
//       payload: true,
//     });
//   } catch (err) {
//     alert(err.message);
//   }
// };

// export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {

// };

// export const resetPassword = ({ email }) => async dispatch => {

// };

// export const signInWithGoogle = () => async dispatch => {

// };
