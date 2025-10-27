import { useState } from "react"
import Guitarra from "./components/guitarra"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

    //UseSatate
    const [data, setData] = useState(db);
    const [cart, setCart] = useState([]);

    //Agregar un item al carrito
    function addToCart(item){

        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)

        if(itemExist){
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity++;
            setCart(updatedCart);
        }else{
            // Agrega al carrito
            item.quantity = 1;
            setCart([...cart, item])
        }

    }

  return (
    <>
        //Esto es un Componente
        <Header />
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                  { data.map((guitar) =>(
                    <Guitarra
                    //Props de guitarra
                      key={guitar.id}
                      guitar={guitar}
                      setCart={setCart}
                      addToCart={addToCart}
                    />
                  ))}
            </div>
        </main>


        <footer className="bg-dark mt-5 py-5">
            <div className="container-xl">
                <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
            </div>
        </footer>
    </>
  )
}

export default App
