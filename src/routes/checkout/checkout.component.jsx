import {CheckoutContainer, CheckoutHeader, HeaderBlock, Total} from './checkout.styles.jsx'

import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

import CheckoutItem from '../../components/checkoutItem/checkoutItem.component';

const Checkout = () => {

    const { cartItems, totalCartPrice } = useContext(CartContext)

    return (
        <CheckoutContainer>
            
            <h1>Checkout Page</h1>
            <CheckoutHeader>
                <HeaderBlock>
                    <span>Product</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Description</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Quantity</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Price</span>
                </HeaderBlock>
                <HeaderBlock>
                    <span>Remove</span>
                </HeaderBlock>

            </CheckoutHeader>
            {cartItems.map((cartItem) =>                 
                    <CheckoutItem key={cartItem.id} cartItem={cartItem} />
            )}
            <Total as='span'>Total: ${totalCartPrice}</Total>
           
        </CheckoutContainer>
    );
};

export default Checkout;