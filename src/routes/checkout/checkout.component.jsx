import './checkout.styles.scss'

import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

import CheckoutItem from '../../components/checkout-item/checkoutItem.component';

const Checkout = () => {

    const { cartItems, totalCartPrice } = useContext(CartContext)

    return (
        <div className='checkout-container'>
            
            <h1>Checkout Page</h1>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>

            </div>
            {cartItems.map((cartItem) =>                 
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <span className='total'>Total: ${totalCartPrice}</span>
           
        </div>
    );
};

export default Checkout;