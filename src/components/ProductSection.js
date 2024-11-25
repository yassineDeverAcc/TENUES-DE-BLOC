import React from "react";
import "./../css/Product.css" ;

const ProductSection = ({ index }) => {
  return (
    <div className="product-section">
      <img src="https://via.placeholder.com/150" alt="Product" />
      <div className="sizes">
        <label>
          <input type="radio" name={`size-${index}`} value="S" /> S
        </label>
        <label>
          <input type="radio" name={`size-${index}`} value="M" /> M
        </label>
        <label>
          <input type="radio" name={`size-${index}`} value="L" /> L
        </label>
        <label>
          <input type="radio" name={`size-${index}`} value="XL" /> XL
        </label>
      </div>
    </div>
  );
};

export default ProductSection;
