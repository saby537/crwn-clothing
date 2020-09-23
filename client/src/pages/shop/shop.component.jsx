import React from "react";
import { connect } from "react-redux";
import { fetchCollectionStart } from "../../redux/shop/shop.actions";
import CollectionOverviewContainer from "../../components/collection-overview/collection-overview.container";
import CollectionPageContainer from "../../pages/CollectionPage/collection.container";
import { Route } from "react-router-dom";
import "./shop.styles.scss";
import { useEffect } from "react";

const ShopPage = ({ fetchCollections, match }) => {
	useEffect(() => {
		fetchCollections();
	}, [fetchCollections]);
	return (
		<div>
			<Route
				exact
				path={`${match.path}`}
				component={CollectionOverviewContainer}
			/>
			<Route
				exact
				path={`${match.path}/:collectionId`}
				component={CollectionPageContainer}
			/>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	fetchCollections: () => dispatch(fetchCollectionStart()),
});
export default connect(null, mapDispatchToProps)(ShopPage);
