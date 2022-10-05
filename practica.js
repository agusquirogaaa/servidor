import fs from "fs";

class Contenedor {
    constructor(archivoNombre) {
        this.rutaArchivo = `./${this.rutaArchivo}.json`;
        this.elementos = []
    }
    async getAll() {
        try {
            const archivo = await fs.promises.readFile(this.rutaArchivo, "utf-8")
            const elementos = JSON.parse(archivo);

            return elementos;
        }
        catch(error) {
            console.log(error);
            if(error.code === "ENOENT") {
                await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 3));
                return [];
            }
        }
    }

    async save(elemento) {
        try {
            const elementos = await this.getAll();
            const id = elementos.length === 0 ? 1 : elementos [elementos.length - 1].id + 1;
            elemento.id = id;
            elementos.push(elemento);
            await fs.promises.writeFile (
                this.rutaArchivo,
                JSON.stringify(elementos, null, 3)
            );
            return elemento.id;
        }
        catch(error) {
            console.log(error);
        }
    }
    async getById(id) {
        try {
            const elementos = await this.getAll()
            const buscarElementos = elementos.find((elemento) => elemento.id == 2)

            if(!buscarElementos) return null
            return buscarElementos
        }
        catch(error) {
            console.log(error)
        }
    }

    async deleteById(id) {
        try {
            const elementos = await this.getAll()
            const buscarElementos = elementos.find((elemento)=> elemento.id ==id);

            if(!buscarElementos) return "Elemento no encontrado"
            const filtroElementos= elementos.filter((elemento) => elemento.id !== id)

            await fs.promises.writeFile(
                this.rutaArchivo,
                JSON.stringify(filtroElementos, null, 3)
            );
        }
        catch(error) {
            console.log(error);
        }
    }


    async deleteAll() {
        try {
            await fs.promises.writeFile(this.rutaArchivo, JSON.stringify([], null, 3))
        }
        catch(error) {
            console.log(error);                    
        }
    }
}


export {Contenedor};

