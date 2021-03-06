import React from "react";
import { connect } from "react-redux";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import { createStructuredSelector } from "reselect";
import StripeCheckoutButton from "../../components/stripe-checkout/stripe-checkout.component";
import "./checkout.styles.scss";
import {
  selectCartItems,
  selectCartTotal,
} from "../../redux/cart/cart.selector";

const CheckoutPage = ({ cartItems, total }) => (
  <div className="checkout-page">
    <div className="checkout-header">
      <div className="header-block">
        <span>Product</span>
      </div>
      <div className="header-block">
        <span>Description</span>
      </div>
      <div className="header-block">
        <span>Quantity</span>
      </div>
      <div className="header-block">
        <span>Price</span>
      </div>
      <div className="header-block">
        <span>Remove</span>
      </div>
    </div>
    {cartItems.map((cartItem) => (
      <CheckoutItem key={cartItem.id} cartItem={cartItem} />
    ))}
    <div className="total">
      <span>Total: ${total}</span>
    </div>
    <div className="test-warning">
      *Please use the below test credit card for payment*
      <br />
      4242 4242 4242 4242 EXP: 12/22 CVV: 123
    </div>
    <StripeCheckoutButton price={total} />
  </div>
);
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
});

export default connect(mapStateToProps)(CheckoutPage);
