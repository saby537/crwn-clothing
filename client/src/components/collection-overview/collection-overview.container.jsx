import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import CollectionOverview from "./collection-overview.component";
import Spinner from "../spinner/spinner.component";
import { isFetching } from "../../redux/shop/shop.selectors";

const mapStateToProps = createStructuredSelector({
  isLoading: isFetching,
});
const CollectionOverviewContainer = compose(
  connect(mapStateToProps),
  Spinner
)(CollectionOverview);

export default CollectionOverviewContainer;
