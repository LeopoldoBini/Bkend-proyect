const prodKeysFormat = [
  "codigo",
  "timestamp",
  "title",
  "price",
  "description",
  "thumbnail",
  "category",
  "stock",
];

const prod1 = {
  id: 1,
  codigo: 2233,
  timestamp: "31/1/1970 3:47:54",
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: "hola",
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  thumbnail: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  category: "men's clothing",
  stock: 0,
};


prodKeysFormat.forEach((key) => {
  const thisKeyValue = prod1[key];
  const isThisKeyStock = key === "stock";
  const isThisKeyPrice = key === "price";
  const isThisValueAcceptable = isThisKeyStock
  ? thisKeyValue >= 0
  : isThisKeyPrice
  ? thisKeyValue > 0
  : !!thisKeyValue;

  console.log(isThisValueAcceptable)
});

const result = prodKeysFormat.reduce((reducingBoolean, key) => {
  const thisKeyValue = Number(prod1[key]) ? Number(prod1[key]) : prod1[key];
  const isThisKeyStock = key === "stock";
  const isThisKeyPrice = key === "price";
  const isThisValueAcceptable = isThisKeyStock
    ? thisKeyValue >= 0
    : isThisKeyPrice
    ? thisKeyValue > 0
    : !!thisKeyValue;

  return reducingBoolean && isThisValueAcceptable;
}, true);

console.log("resultadd del reduce: ",result);
