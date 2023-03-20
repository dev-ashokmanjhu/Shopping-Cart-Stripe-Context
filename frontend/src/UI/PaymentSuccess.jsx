import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div
      style={{
        color: "white",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "30px",
      }}
    >
      <h4>Thank You For Purchasing Our Products!!</h4>
      <Link to="/">
        <button
          style={{
            border: "none",
            borderRadius: "5px",
            backgroundColor: "lightgreen",
            color: "black",
            fontSize: "20px",
            fontWeight: "600",
          }}
        >
          Close
        </button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
