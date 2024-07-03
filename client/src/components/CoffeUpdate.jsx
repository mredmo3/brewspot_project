import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { deleteOneCoffeeId, getOneCoffeeId } from "../services/coffee.services";

export const CoffeeUpdate = ({ submitFunction }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [coffeeUpdate, setCoffeeUpdate] = useState({
    brand: "",
    brew: "",
    description: "",
    isOwner: false,
  });

  const [coffeeErrors, setCoffeeErrors] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if ((id, token)) {
      getOneCoffeeId(id, token).then((res) => setCoffeeUpdate(res));
    }
  }, [id]);

  const updateCoffee = (e) => {
    const { name, value } = e.target;
    setCoffeeUpdate((prev) => ({ ...prev, [name]: value }));
  };

  const deleteCoffeeHandler = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    deleteOneCoffeeId(id, token).then(() => navigate("/coffee"));
  };

  const logoutHandler = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    navigate(`/`);
  };

  const submitHandler = (e) => {
    const token = localStorage.getItem("token");
    e.preventDefault();
    const update = {
      _id: id,
      brand: coffeeUpdate.brand,
      brew: coffeeUpdate.brew,
      description: coffeeUpdate.description,
    };
    submitFunction(update, token)
      .then(() => navigate(`/coffee`))
      .catch((error) => setCoffeeErrors(error.response.data.errors));
  };

  return (
    <>
      <header className="updateHeader">
        <h1>Welcome to BrewSpot Update {coffeeUpdate.brand}</h1>
        <Link to={`/coffee`}>
          <button className="homeButton">Home</button>
        </Link>
        <button className="logoutButton" onClick={logoutHandler}>
          Logout
        </button>
      </header>
      <div className="container3">
        {coffeeUpdate.isOwner ? (
          <form className="updateForm" onSubmit={submitHandler}>
            <label>
              Coffee Brand:
              <input
                type="text"
                name="brand"
                value={coffeeUpdate.brand}
                onInput={updateCoffee}
              />
              <p>{coffeeErrors.brand?.message}</p>
            </label>
            <label>
              Brew Type:
              <input
                type="text"
                name="brew"
                value={coffeeUpdate.brew}
                onInput={updateCoffee}
              />
              <p>{coffeeErrors.brew?.message}</p>
            </label>
            <label>
              Coffee Description:
              <input
                type="textarea"
                name="description"
                value={coffeeUpdate.description}
                onInput={updateCoffee}
              />
              <p>{coffeeErrors.description?.message}</p>
            </label>
            <input
              className="updateButtonSubmit"
              type="submit"
              value="Update Coffee"
            />
            <button className="deleteButton" onClick={deleteCoffeeHandler}>
              Delete Coffee
            </button>
          </form>
        ) : (
          <div className="viewedList">
            <p>Coffee Brand: {coffeeUpdate.brand}</p>
            <p>Coffee Brew Type: {coffeeUpdate.brew}</p>
            <p>Coffee Description: {coffeeUpdate.description}</p>
          </div>
        )}
      </div>
      <footer className="footer"></footer>
    </>
  );
};
