import { takeLatest, call, all, put } from 'redux-saga/effects';
import userTypes from './user.types';
import { auth, handleUserProfile, getCurrentUser, googleProvider } from '../../firebase/utils';
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess, userErrors } from './user.actions';
import { EMAIL_REGX } from '../../constants/constants';
import { handleResetPasswordAPI } from './user.helper';

export function* getSnapShotFromUserAuth(user, additionalData = {}) {
  // calling utility to update data in db
  const useRef = yield call(handleUserProfile, { userAuth: user, additionalData });
  const snapshot = yield useRef.get();
  yield put(
    signInSuccess({
      id: snapshot.id,
      ...snapshot.data(),
    })
  );
}

export function* withEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapShotFromUserAuth(user);
  } catch (err) {
    // console.log(err.message);
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, withEmail);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;
    yield getSnapShotFromUserAuth(userAuth);
  } catch (err) {
    // console.log(err);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* singOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (err) {
    // console.log(err);
  }
}

export function* onSignOutUSerStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, singOutUser);
}

export function* signUpUser({ payload: { displayName, email, password, confirmPassword } }) {
  const errorMessages = [];
  if (displayName.trim().length === 0) {
    errorMessages.push('Name required');
  }
  if (email.trim().length === 0) {
    errorMessages.push('Email required');
  }
  if (!EMAIL_REGX.test(email)) {
    errorMessages.push('Invalid Email');
  }
  if (password !== confirmPassword) {
    errorMessages.push('Password and confirm password not matching');
  }

  if (errorMessages.length > 0) {
    yield put({
      type: userTypes.USER_ERRORS,
      payload: errorMessages,
    });
    return;
  }
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    // Add user details using utility function after creating user with latest data
    const additionalData = { displayName };
    yield getSnapShotFromUserAuth(user, additionalData);
  } catch (err) {
    // console.log(err);
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({ payload: { email } }) {
  try {
    yield call(handleResetPasswordAPI, email);
    yield put(resetPasswordSuccess());
  } catch (err) {
    if (Array.isArray(err) && err.length > 0) yield put(userErrors(err));
  }
}

export function* onResetPasswordStart() {
  yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword);
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    yield getSnapShotFromUserAuth(user);
  } catch (err) {
    // console.log(err)
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export default function* userSagas() {
  yield all([
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutUSerStart),
    call(onSignUpUserStart),
    call(onResetPasswordStart),
    call(onGoogleSignInStart),
  ]);
}
