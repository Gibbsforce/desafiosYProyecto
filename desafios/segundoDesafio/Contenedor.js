const fs = require("fs");
class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async save (obj) {
        const path = `./${this.fileName}`;
        const file = await fs.promises.access(path, fs.constants.F_OK).then(() => true).catch(async () => {
            try {
                await fs.promises.writeFile(path, "", "utf-8");
                return false;
            } catch (error) {
                console.log("Hubo un error: ", error);
            }
        }); 
        if (!file) return console.log("Archivo creado.");
        try {
            const readJSON = await fs.promises.readFile(path, "utf-8");
            let newObj = [];
            if (readJSON === "" || readJSON === "[]") {
                obj.id = 1;
                newObj.push(obj);
            } else {
                const arrRead = JSON.parse(readJSON);
                obj.id = arrRead[arrRead.length - 1].id + 1;
                arrRead.push(obj);
                newObj = arrRead;
            }
            await fs.promises.writeFile(path, JSON.stringify(newObj, null, 2), "utf-8");
            return obj.id;
        } catch (error) {
            console.log("Hubo un error: ", error);
        }
    }
    async getById (num) {
        const path = `./${this.fileName}`;
        try {
            const readJSON = JSON.parse(await fs.promises.readFile(path, "utf-8"));
            const objId = readJSON.find(({ id }) => id === num);
            if (!objId) return null;
            return objId;
        } catch (error) {
            console.log("Hubo un error: ", error);
        }
    }
    async getAll () {
        const path = `./${this.fileName}`;
        try {
            return JSON.parse(await fs.promises.readFile(path, "utf-8"));
        } catch (error) {
            console.log("Hubo un error: ", error);
        }
    }
    async deleteById (num) {
        const path = `./${this.fileName}`;
        try {
            const readJSON = JSON.parse(await fs.promises.readFile(path, "utf-8"));
            const indexId = readJSON.map(({ id }) => id).indexOf(num);
            if (indexId === -1) return console.log("El producto buscado no existe");
            readJSON.splice(indexId, 1);
            try {
                await fs.promises.writeFile(path, JSON.stringify(readJSON, null, 2), "utf-8");
                return console.log(`El prodcuto con el id: ${num} ha sido eliminado exitosamente.`);
            } catch (error) {
                console.log("Hubo un error: ", error);
            }
        } catch (error) {
            console.log("Hubo un error: ", error);
        }
    }
    async deleteAll () {
        const path = `./${this.fileName}`;
        try {
            const readJSON = await fs.promises.readFile(path, "utf-8");
            if (readJSON === "") return console.log("La lista esta vacia.");
            await fs.promises.writeFile(path, "", 'utf-8');
            return console.log("Todos los productos han sido eliminados exitosamente.")
        } catch (error) {
            console.log("Hubo un error: ", error);
        }
    }
}
module.exports = Contenedor;