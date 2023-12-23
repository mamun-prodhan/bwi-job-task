import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [priceBar, setPriceBar] = useState(2000);
  const [loading, setLoading] = useState(true);
  // console.log("loading state", loading, "and products data", products.length);

  // fetching data from api
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

  console.log(products);

  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleSearch = () => {
    console.log("handle search");
    const filtered = products.filter((item) =>
      item.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handlePrice = () => {
    const filtered = products.filter(
      (item) => parseInt(item.price, 10) <= parseInt(priceBar, 10)
    );
    setFilteredData(filtered);
  };

  if (loading) {
    return (
      <p className="text-5xl text-red-600 font-bold text-center my-20">
        Loading..............
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mt-20">
      {/* header div */}
      <div>
        {/* search bar */}
        <div>
          <input
            className="border py-2 px-3 rounded-s-lg"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            value={search}
            placeholder="Search by title..."
          />
          <button
            className="border py-2 px-3 text-white font-semibold rounded-e-lg bg-indigo-600 hover:bg-indigo-700 duration-300"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {/* price bar */}
        <div>
          <p className="text-xl font-semibold mt-5">Price</p>
          <p>${priceBar}</p>
          <input
            type="range"
            name="price"
            min={13}
            max={2000}
            value={priceBar}
            onChange={(e) => setPriceBar(e.target.value)}
            id="price"
          />
          <button
            onClick={handlePrice}
            className="border py-2 px-3 text-white font-semibold rounded-e-lg bg-indigo-600 hover:bg-indigo-700 duration-300"
          >
            Filter By Price
          </button>
        </div>
        <div className="text-end">
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
      {/* card div */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 lg:px-0 my-5 md:my-10">
        {filteredData.map((item) => (
          <ProductCard key={item.id} item={item}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
