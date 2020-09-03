import { takeLatest, put, call, all } from "redux-saga/effects";
import { userActionTypes } from "./user.types";
import {
  auth,
  createUserProfileDocument,
  provider,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure,
} from "./user.actions";

export function* signInSuccessAsync(user, additionalData) {
  try {
    const userRef = yield call(createUserProfileDocument, user, additionalData);
    const userSnapShot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
  } catch (err) {
    yield put(signInFailure(err));
  }
}
export function* googleSignAsync() {
  try {
    const { user } = yield auth.signInWithPopup(provider);
    yield signInSuccessAsync(user);
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* googleSignInStart() {
  yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, googleSignAsync);
}

export function* emailSignAsync({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield signInSuccessAsync(user);
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* emailSignInStart() {
  yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, emailSignAsync);
}

export function* getUser() {
  try {
    const userAuth = yield getCurrentUser();
    yield signInSuccessAsync(userAuth);
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* checkSession() {
  yield takeLatest(userActionTypes.CHECK_SESSION, getUser);
}

export function* signOutAsync() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

export function* onSignOut() {
  yield takeLatest(userActionTypes.SIGN_OUT_START, signOutAsync);
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield signInSuccessAsync(user, additionalData);
}

export function* onSignUpSuccess() {
  yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}
export function* onSignUp() {
  yield takeLatest(userActionTypes.SIGN_UP_START, signUp);
}

export function* userSagas() {
  yield all([
    call(emailSignInStart),
    call(googleSignInStart),
    call(checkSession),
    call(onSignOut),
    call(onSignUp),
    call(onSignUpSuccess),
  ]);
}
