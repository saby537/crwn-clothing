import React from "react";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
import CollectionOverview from "../../components/collection-overview/collection-overview.component.jsx";
import CollectionPage from "../../pages/CollectionPage/collection.component";
import Spinner from "../../components/spinner/spinner.component";
import { Route } from "react-router-dom";
import { firestore, getCollectionData } from "../../firebase/firebase.utils";
import "./shop.styles.scss";

const CollectionOverviewWithSpinner = Spinner(CollectionOverview);
const CollectionPageWithSpinner = Spinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;
  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection("collections");
    collectionRef.onSnapshot((snapshot) => {
      getCollectionData(snapshot).then((response) =>
        updateCollections(response)
      );
      this.setState({ loading: false });
    });
  }
  render() {
    const { match } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <Route
          exact
          path={`${match.path}`}
          render={(props) => (
            <CollectionOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          exact
          path={`${match.path}/:collectionId`}
          render={(props) => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateCollections: (collectionsMap) =>
    dispatch(updateCollections(collectionsMap)),
});
export default connect(null, mapDispatchToProps)(ShopPage);
