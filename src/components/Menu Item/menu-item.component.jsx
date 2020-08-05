import React from "react";
import "./menu-item.styles.scss";

const MenuItem = ({ title, imageUrl, size }) => (
  <div className={`${size} menu-item`}>
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className="background-image"
    />
    <div className="content">
      <div className="title">{title.toUpperCase()}</div>
      <div className="subtitle">SHOP NOW</div>
    </div>
  </div>
);

export default MenuItem;
