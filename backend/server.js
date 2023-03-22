const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51MmshQSGM81LbUX4GUp773yBGjR67MNmyzMKOKz6AK1YfgpLCWbfMU1iOKyOwK7wfecYPHqvq6LcdaTuePcYXd24003iybVJuT"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: item.price * 100 * 81,
      },
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection: {
      allowed_countries: ["IN"],
    },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 0,
            currency: "inr",
          },
          display_name: "Free shipping",
          // Delivers between 5-7 business days
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 5,
            },
            maximum: {
              unit: "business_day",
              value: 7,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: {
            amount: 1500,
            currency: "inr",
          },
          display_name: "Next day air",
          // Delivers in exactly 1 business day
          delivery_estimate: {
            minimum: {
              unit: "business_day",
              value: 1,
            },
            maximum: {
              unit: "business_day",
              value: 2,
            },
          },
        },
      },
    ],
    phone_number_collection: {
      enabled: true,
    },
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/",
    cancel_url: "http://localhost:5173/",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () => console.log("Listening on port 4000!"));
