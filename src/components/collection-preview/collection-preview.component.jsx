import React from "react";
import { Link } from "react-router-dom";
import CollectionItem from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

const CollectionPreview = ({ title, routeName, items }) => {
  return (
    <div className="collection-preview">
      <Link className="title" to={`shop/${routeName}`}>
        {title}
      </Link>
      <div className="preview">
        {items
          .filter((item, id) => id < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default CollectionPreview;
