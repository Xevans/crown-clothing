import {CartDropdownContainer, CartItemsContainer, EmptyMessage } from './cart-dropdown.styles.jsx';
import Button from '../buttons/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';


const CartDropdown = () => {

    const { cartItems } = useContext(CartContext)
    const navigate = useNavigate(); // use navigate returns a method from react router

    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <CartDropdownContainer>
            <CartItemsContainer>

                { cartItems.length ? 
                    (cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                    ))) :
                    <EmptyMessage as='span'>Your cart is empty</EmptyMessage>
                }
            </CartItemsContainer>
            <Button onClick={goToCheckoutHandler}>Checkout</Button>
        </CartDropdownContainer>
    );
};

export default CartDropdown;