import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [priceBar, setPriceBar] = useState(2000);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  // add to cart
  const addToCart = (product) => {
    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify({ cartItems: updatedCart }));
  };

  const calculateTotalAmount = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  // clear cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
  };

  // get stored cart from local storage
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || {
      cartItems: [],
    };
    setCartItems(storedCart.cartItems);
  }, []);

  // fetching products data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error(`Error Status:${response.status}`);
        }
        const data = await response.json();
        setProducts(data.products), setFilteredData(data.products);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // logout implement
  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // search implement
  const handleSearch = () => {
    console.log("handle search");
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // price filtering
  const handlePrice = () => {
    const filtered = products.filter(
      (item) => parseInt(item.price, 10) <= parseInt(priceBar, 10)
    );
    setFilteredData(filtered);
  };

  // loading state
  if (loading) {
    return (
      <p className="text-5xl text-red-600 font-bold text-center my-20">
        Loading..............
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto my-5 md:my-10 px-4">
      <div className="flex md:flex-row justify-between flex-col-reverse">
        <div>
          {/* search bar */}
          <div>
            <input
              className=" border py-2 px-3 rounded-lg md:rounded-s-lg"
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              value={search}
              placeholder="Search by title..."
            />
            <button
              className="mt-3 md:mt-0 border py-2 px-3 text-white font-semibold rounded-lg md:rounded-e-lg bg-indigo-600 hover:bg-indigo-700 duration-300"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          {/* price bar */}
          <div className="">
            <p className="text-xl font-semibold mt-5">Price</p>
            <p className="font-semibold">${priceBar}</p>
            <input
              className="w-52"
              type="range"
              name="price"
              min={13}
              max={2000}
              value={priceBar}
              onChange={(e) => setPriceBar(e.target.value)}
              id="price"
            />
            <div>
              <button
                onClick={handlePrice}
                className="border py-2 px-3 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 duration-300"
              >
                Filter By Price
              </button>
            </div>
          </div>
        </div>
        {/* product in cart */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-5 my-3">
          <div>
            <p className="text-xl font-semibold">
              Cart Count: {cartItems.length}
            </p>
            <p className="font-semibold">
              Total Amount: ${calculateTotalAmount()}
            </p>
          </div>
          <div>
            <button
              className="border py-2 px-3 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700 duration-300"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        </div>

        {/* logout btn */}
        <div className="text-start md:text-end mb-3">
          <button
            onClick={logout}
            className="border-2 border-indigo-700 bg-indigo-700 text-white px-6 py-2  rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>

      {/* if no data found */}
      {!filteredData.length && (
        <div>
          <h2 className="text-5xl font-bold text-center text-red-500 my-20">
            No data found
          </h2>
        </div>
      )}
      {/*all product card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-5 md:my-10">
        {filteredData.map((item) => (
          <ProductCard
            key={item.id}
            item={item}
            addToCart={addToCart}
          ></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
