import { useState } from "react";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
// import axios from "axios";
import clienteAxios from "../../config/axios";
import bananaContenta from "../../assets/bananita.png";

import "./Product.css";

console.log(import.meta.env.VITE_BACKEND_URL)

const Product = () => {
  const [preferenceId, setPreferenceId] = useState(null);

  // initMercadoPago("TEST-e4befb42-87cc-4528-b174-d51f4d22a861");
  initMercadoPago("APP_USR-76bb1128-6481-442f-bb97-fd085e82df56");

  const createPreference = async () => {
    try {
      const response = await clienteAxios.post("/create_preference", {
        description: "Bananita contenta",
        unit_price: 5000,
        quantity: 1,
      })
      // axios.post(
      //   `${process.env.BACKEND_URL}/create_preference`,
      //   {
      //     description: "Bananita contenta",
      //     unit_price: 5000,
      //     quantity: 1,
      //   }
      // );
      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <div className="card-product-container">
      <div className="card-product">
        <div className="card">
          <img src={bananaContenta} alt="product image" />
          <h3>bananita contenta</h3>
          <p className="price">100 $</p>
          <button onClick={handleBuy}>buy</button>
          {preferenceId && <Wallet initialization={{ preferenceId }} />}
        </div>
      </div>
    </div>
  );
};

export default Product;
