import { Routes, Route } from "react-router-dom";
import "./App.css";
import { addCoffee, updateOneCoffeeId } from "./services/coffee.services.js";
import { CoffeeAdd } from "./components/CoffeeAddAndDisplay";
import { CoffeeUpdate } from "./components/CoffeUpdate";
import { UserRegLoginForm } from "./components/UserRegLogin.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserRegLoginForm />} />
        <Route
          path="/coffee"
          element={<CoffeeAdd submitFunction={addCoffee} />}
        />
        <Route
          path="/:id"
          element={<CoffeeUpdate submitFunction={updateOneCoffeeId} />}
        />
      </Routes>
    </>
  );
}

export default App;
