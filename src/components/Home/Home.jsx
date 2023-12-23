import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
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
        setProducts(data.products);
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

  if (loading) {
    return (
      <p className="text-5xl text-red-600 font-bold text-center my-20">
        Loading..............
      </p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* header div */}
      <div>
        <h2>This is home page</h2>
        <h2 className="">Total Products {products.length}</h2>
        <div className="text-end">
          <button
            onClick={logout}
            className="border-2 border-indigo-700 bg-indigo-700 text-white px-6 py-2  rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold transition-all duration-300"
          >
            Logout
          </button>
        </div>
      </div>
      {/* cart div */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-4 my-5 md:my-10">
        {products.map((item) => (
          <ProductCard key={item.id} item={item}></ProductCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
