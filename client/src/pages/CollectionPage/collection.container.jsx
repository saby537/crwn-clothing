import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import CollectionPage from "./collection.component";
import Spinner from "../../components/spinner/spinner.component";
import { selectIsCollectionLoaded } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: (state) => !selectIsCollectionLoaded(state),
});

const CollectionPageContainer = compose(
  connect(mapStateToProps),
  Spinner
)(CollectionPage);

export default CollectionPageContainer;
