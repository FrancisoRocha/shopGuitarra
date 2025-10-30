import Guitarra from "./components/guitarra"
import Header from "./components/Header"
import { useCart } from "./hooks/useCart"

function App() {

    const {  data, cart, addToCart, removeToCart, incrementQuantity, decrementQuantity, clearCart,
            isEmpty,  carTotal} = useCart();

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
            isEmpty={isEmpty}
            carTotal={carTotal}
        />

        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
                  { data.map((guitar) =>(
                    <Guitarra
                    //Props de guitarra
                      key={guitar.id}
                      guitar={guitar}
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
