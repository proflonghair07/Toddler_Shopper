import React from "react";

function Navbar() {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">Toddler Shopper</h1>
          <button class="button is-primary">
            Checkout <i class="fa fa-shopping-cart" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
export default Navbar;
