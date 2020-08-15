import React from "react";
import { connect } from "react-redux";
import CartItem from "../cart-item/cart-item.component";
import CustomButton from "../Custom-Button/Custom-Button.component";
import { withRouter } from "react-router";
import { createStructuredSelector } from "reselect";
import { selectCartItems } from "../../redux/cart/cart.selector";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import "./cart-dropdown.styles.scss";

const Cart = ({ cartItems, history, dispatch }) => (
  <div className="cart-dropdown">
    <div className="cart-items">
      {cartItems.length ? (
        cartItems.map((item) => <CartItem key={item.id} item={item} />)
      ) : (
        <span className="empty-message">Your cart is empty</span>
      )}
    </div>
    <CustomButton
      onClick={() => {
        history.push("/checkout");
        dispatch(toggleCartHidden());
      }}
    >
      GO TO CHECKOUT
    </CustomButton>
  </div>
);
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});
export default withRouter(connect(mapStateToProps)(Cart));
