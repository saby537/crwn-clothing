import { all, call, put, takeLatest } from "redux-saga/effects";
import { clearItem } from "./cart.actions";
import { userActionTypes } from "../user/user.types";

export function* clearItemSignOut() {
  yield put(clearItem());
}

export function* onClearItemSignOut() {
  yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearItemSignOut);
}

export function* cartSagas() {
  yield all([call(onClearItemSignOut)]);
}
