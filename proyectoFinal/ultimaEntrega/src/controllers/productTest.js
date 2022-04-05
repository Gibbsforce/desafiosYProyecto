import faker from "faker"
const gettingProductsTest = (req, res) => {
  const product = [...new Array(10)].map((_, index) => ({
    _id: index,
    title: faker.commerce.productName(),
    description: faker.lorem.sentence(),
    code: faker.random.alphaNumeric(6),
    thumbnail: faker.image.imageUrl(),
    price: faker.commerce.price(),
    stock: Math.floor(Math.random() * 30),
  }))
  res.json({
    message: "OK",
    products: product,
  })
}
export default {
  gettingProductsTest,
}
