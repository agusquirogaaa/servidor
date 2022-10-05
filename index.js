import {Contenedor} from "./practica.js"

const ProductoConenedor = new Contenedor("productos");
const CarritoContenedor = new Contenedor()

const express = require ('express');
const app = express();
const PORT = process.env.PORT || 8040;


ProductoConenedor.getAll()
.then((data)=> console.log({data}))
.catch((error)=> console.log({error}))


ProductoConenedor.save ({
    titulo: "Producto 1",
    precio: 300,
    imagen: "fdafdas" 
})
.then(data => console.log({data}))
.catch(error => console.log({error})) 

ProductoConenedor.getById(100)
.then(data => console.log({data}))
.catch((errorcito)=> console.log({errorcito}))

const productos = [
    { titulo: "Producto 1",
    precio: 300,
    imagen: "jgalksdfdas", 
},
{ titulo: "Producto 2",
    precio: 300,
    imagen: "jgalksdfdas", 
},
{ titulo: "Producto 3",
    precio: 300,
    imagen: "jgalksdfdas", 
},
];

const testMethods = async () => {
   try { 
    const productoID1 = await ProductoConenedor.save(productos[0]);
    const productoID2 = await ProductoConenedor.save(productos[1]);
    const productoID3 = await ProductoConenedor.save(productos[2]);
    
    const producto = await ProductoConenedor.getById(1);
    console.log({producto});
    }
    catch(error) {
        console.log({error});
    }
};

testMethods();


const documento = new Desafio("Desafio")
documento.save({
    titulo: "producto nuevo",
    precio:1000,
    id:5
})

app.get("/productos", (req,res) => {
    documento.getAll()
    .then (lista=>{
        JSON.parse(lista)
      })
       .then(listaParse => {
        res.json(listaParse)
      })
     
})

app.get("/productoRandom", (req,res) => {
    documento.getAll()
    .then (lista => {
        JSON.parse(lista)
    })
    .then (listaParse => {
        listaParse [randomFunction(listaParse.length)]
    })
    .then(itemLista => 
        res.json(itemLista)
    )
})




const server = app.listen( PORT, () => console.log(`Server listening on PORT ${PORT}`));
                          
  