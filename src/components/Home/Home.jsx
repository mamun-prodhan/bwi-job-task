const Home = () => {
  const logout = () => {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  return (
    <div>
      <h2>This is home page</h2>
      <button onClick={logout} className="btn">
        {" "}
        Logout
      </button>
    </div>
  );
};

export default Home;
