const Contenedor = require("./Contenedor");
const contenedor = new Contenedor("products.json");
const addObj = {
    title: "Laptop",
    price: "$ 1 499.00",
    thumbnail: "url1"
}
const main = async () => {
    // await contenedor.save(addObj);
    // const getById = await contenedor.getById(3);
    // console.log(getById);
    // const getAll = await contenedor.getAll();
    // console.log(getAll);
    // await contenedor.deleteById(2);
    // await contenedor.deleteAll();
}
main();