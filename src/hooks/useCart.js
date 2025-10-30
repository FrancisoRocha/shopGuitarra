import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

export const useCart = () => {

    const initialCart = () => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : [];
    }

    //UseSatate
    const [data] = useState(db);
    const [cart, setCart] = useState(initialCart);

    const MAX_ITEMS = 5;
    const MIN_ITEMS = 1;

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

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

    //State Derivado -- Retorna True o False
    const isEmpty = useMemo( () => cart.length === 0, [cart]);
    const carTotal = useMemo( () => cart.reduce((total, item) => total + (item.quantity * item.price), 0), [cart] );

    return {
        data,
        cart,
        addToCart,
        removeToCart,
        incrementQuantity,
        decrementQuantity,
        clearCart,
        isEmpty,
        carTotal
    }

}
