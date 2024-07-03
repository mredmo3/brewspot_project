import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getAllCoffee } from "../services/coffee.services";

export const CoffeeAdd = ({ submitFunction }) => {
  const navigate = useNavigate();
  const [coffeeAdd, setCoffeeAdd] = useState({
    brand: "",
    brew: "",
    description: "",
  });
  const location = useLocation();
  const [coffeeList, setCoffeeList] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getAllCoffee(token)
      .then((res) => setCoffeeList(res))
      .catch((error) => navigate("/"));
  }, [location]);

  const [coffeeErrors, setCoffeeErrors] = useState({});

  const updateCoffee = (e) => {
    const { name, value } = e.target;
    setCoffeeAdd((prev) => ({ ...prev, [name]: value }));
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate(`/`);
  };
  const submitHandler = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    submitFunction(coffeeAdd, token)
      .then(() =>
        setCoffeeAdd({
          brand: "",
          brew: "",
          description: "",
        })
      )
      .then(() => getAllCoffee(token).then((res) => setCoffeeList(res)))
      .catch((error) => setCoffeeErrors(error.response.data.errors));
  };
  return (
    <>
      <header className="mainHeader">
        <h1>Welcome to BrewSpot share your favorite coffee</h1>
        <button className="logoutButton" onClick={logoutHandler}>
          Logout
        </button>
      </header>
      <div className="container2">
        <form className="coffeeAdd" onSubmit={submitHandler}>
          <label>
            Coffee Brand:
            <input
              type="text"
              name="brand"
              placeholder="Coffee Brand"
              value={coffeeAdd.brand}
              onInput={updateCoffee}
            />
            <p>{coffeeErrors.brand?.message}</p>
          </label>
          <label>
            Brew Type:
            <input
              type="text"
              name="brew"
              placeholder="Brew Type"
              value={coffeeAdd.brew}
              onInput={updateCoffee}
            />
            <p>{coffeeErrors.brew?.message}</p>
          </label>
          <label>
            Coffee Desctription:
            <input
              type="textarea"
              name="description"
              placeholder="Coffee Description"
              value={coffeeAdd.description}
              onInput={updateCoffee}
            />
            <p>{coffeeErrors.description?.message}</p>
          </label>
          <input className="addCoffeeButton" type="submit" value="Add Coffee" />
        </form>
        <div className="coffeeList">
          <p className="text">All Coffee</p>
          {coffeeList.map(
            ({ brand, brew, description, firstName, lastName, _id }) => (
              <div key={_id}>
                <p>
                  Coffee Brand:
                  <Link to={`/${_id}`} className="detailsLink">
                    {brand}
                  </Link>
                </p>
                <p>Brew Type: {brew}</p>
                <p>Description:{description}</p>
                <p>
                  Friend who added coffee: {firstName}
                  {lastName}
                </p>
              </div>
            )
          )}
        </div>
      </div>
      <footer className="footer"></footer>
    </>
  );
};
