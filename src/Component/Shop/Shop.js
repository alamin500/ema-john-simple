import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import {addToDb, getStoredCart} from '../../utilities/fakedb'
import './Shop.css'
const Shop = () => {
    const[products, setProducts] = useState([]);
    const[cart, setCart] = useState([]);

    useEffect(() =>{
        fetch('./products.JSON')
        .then(res => res.json())
        .then(data => setProducts(data));
    }, []);
    useEffect(() =>{
        if(products.length){
        const savedCart = getStoredCart();
        const StoredCart = [];
        for(const key in savedCart){
            
            const addedProduct = products.find(product => product.key === key);
            StoredCart.push(addedProduct);

        }
        setCart(StoredCart);
    }
    }, [products])
    const handleAddToCart = (product) =>{
        const newCart = [...cart, product];
        setCart(newCart);
        // save to localStorage
        addToDb(product.key);
    }
    return (
        <div className="shop-container">
            <div className="product-container">
         
                {
                    products.map(product => <Product
                    key = {product.key}
                    product={product}
                    handleAddToCart = {handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className="cart-container">
                <Cart cart = {cart}></Cart>
            </div>
               
        </div>
    );
};

export default Shop;