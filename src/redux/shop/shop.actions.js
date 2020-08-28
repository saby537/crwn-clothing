import { firestore, getCollectionData } from "../../firebase/firebase.utils";
import shopActionTypes from "./shop.types";
export const fetchCollectionStart = () => ({
  type: shopActionTypes.FETCH_COLLECTIONS_START,
});
export const fetchCollectionSuccess = (collection) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collection,
});
export const fetchCollectionFailure = (message) => ({
  type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: message,
});
export const fetchCollections = () => {
  console.log("fetching");
  return (dispatch) => {
    const collectionRef = firestore.collection("collections");
    dispatch(fetchCollectionStart());
    collectionRef
      .get()
      .then((snapshot) => {
        getCollectionData(snapshot).then((response) =>
          dispatch(fetchCollectionSuccess(response))
        );
      })
      .catch((err) => {
        dispatch(fetchCollectionFailure(err));
      });
  };
};
