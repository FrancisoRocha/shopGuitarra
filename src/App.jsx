import { useState } from "react"
import Guitarra from "./components/guitarra"
import Header from "./components/Header"
import { db } from "./data/db"

function App() {

    //UseSatate
    const [data, setData] = useState(db);
    const [cart, setCart] = useState([]);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    //Agregar un item al carrito
    function addToCart(item){

        const itemExist = cart.findIndex((guitar) => guitar.id === item.id)

        if(itemExist >= 0){
            if (cart[itemExist].quantity >= MAX_ITEMS) return;
            const updatedCart = [...cart];
            updatedCart[itemExist].quantity++;
            setCart(updatedCart);
        }else{
            // Agrega al carrito
            item.quantity = 1;
            setCart([...cart, item])
        }

    }

    //Eliminar un item del carrito
    function removeToCart(id){
        setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    }

    //Incrementar la cantidad del item
    function incrementQuantity(id){
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < MAX_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity + 1
                }
            }
            return item
        })
        setCart(updatedCart);
    }


    //Decrementar la cantidad del item
    function decrementQuantity(id){
        const decrementCart = cart.map(item =>{
            if(item.id === id && item.quantity > MIN_ITEMS){
                return {
                    ...item,
                    quantity: item.quantity - 1
                }
            }
            return item;
        })
        setCart(decrementCart);
    }

    //Vaciar el carrit
    function clearCart(){
        setCart([]);
    }

  return (
    <>
        {/* Esto es un Componente */}
        <Header
            //Props del Header
            cart={cart}
            removeToCart={removeToCart}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            clearCart={clearCart}
        />
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
