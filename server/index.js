require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

//stripe initialize
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

app.get("/", (req, res) => {
  res.send("stripe payment backend running");
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1NoUFNCT5bl49WJniGlyCxw9",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.SERVER_URL}/donate-success`,
      cancel_url: `${process.env.SERVER_URL}/donate`,
    });

    res.send({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(port, () => {
  console.log(`stripe payment backend running at port: ${port}`);
});
