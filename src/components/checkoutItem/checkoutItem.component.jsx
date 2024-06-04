import './checkout-item.styles.scss';

import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CheckoutItem = ({cartItem}) => { // dont forget curley braces to destructure props

    const {addItemToCart, removeItemFromCart, subtractItemFromCart} = useContext(CartContext)

    const removeItem = () => removeItemFromCart(cartItem)
    const addItem = () => addItemToCart(cartItem)
    const subtractItem = () => subtractItemFromCart(cartItem)

    const {imageUrl, name, quantity, price} = cartItem;
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} /> 
            </div>
            <span className='name'> {name} </span>
            <span className='quantity'> 
                <div className='arrow' onClick={subtractItem}>&#10094;</div> 
                <span className='value'>{quantity}</span> 
                <div className='arrow' onClick={addItem}>&#10095;</div> 
            </span>
            <span className='price'> ${price} </span>
            <span className='remove-button' onClick={removeItem}>&#1005;</span>
        </div>
    );
};

export default CheckoutItem;