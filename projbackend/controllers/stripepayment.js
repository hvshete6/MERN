const stripe = require("stripe")(
  "sk_test_51Iov87SDwCtV2IeZf7l2gXTetGD1ECUQKlY1D5WmCb6qqOOlr2RGHlNKjtS8MOLk9oc6ztgywEh3pv3e9MZiGmVL00Ii5g4Jfe"
);
const uuid = require("uuid/v4");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;
  console.log("PRODUCTS", products);

  let amount = 0;
  products.map((p) => {
    amount = amount + p.price;
  });

  const idempotencykey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: "a test account",
            shipping: {
              name: token.card.name, //for more refer documentation
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line12,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip,
              },
            },
          },
          { idempotencykey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => console.log(err));
    });
};
