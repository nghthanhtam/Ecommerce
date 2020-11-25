import React from "react";

export default function Footer() {
  return (
    <footer className="fixed-footer">
      <div className="shopnow">
        <div className="shop">SHOP</div>
        <div className="now">NOW</div>
      </div>
      <div className="description">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text
      </div>
      <div className="social">
        <div>
          <i className="fa fa-facebook"></i>
        </div>
        <div>
          <i className="fa fa-instagram"></i>
        </div>
        <div>
          <i className="fa fa-twitter"></i>
        </div>
      </div>
      <div className="footer-cate">
        <div>Trending</div>
        <div>Best Seller</div>
        <div>All Products</div>
        <div>Wishlist</div>
      </div>
    </footer>
  );
}
