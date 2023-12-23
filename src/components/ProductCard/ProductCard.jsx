import React from "react";

const ProductCard = ({ item, addToCart }) => {
  return (
    <div className="p-4 border rounded-lg">
      <div
        className="h-48 bg-cover bg-center rounded-lg border"
        style={{ backgroundImage: `url(${item.thumbnail})` }}
      ></div>
      <div className="mt-3 space-y-2">
        <h3 className="text-2xl font-semibold">{item.title}</h3>
        <div className="flex items-center gap-5">
          <p className="text-xl">Price: ${item.price}</p>{" "}
          <p className="bg-red-200 px-2 rounded">
            {item.discountPercentage}% OFF
          </p>
        </div>
        <p className="text-sm capitalize text-gray-500">
          {item.brand} | {item.category}
        </p>
        <button
          onClick={() => addToCart(item)}
          className="border border-indigo-700 bg-indigo-700 text-white px-6 py-2  rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold transition-all duration-300"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
