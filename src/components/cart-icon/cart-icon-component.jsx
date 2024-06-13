import {ShopIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx'
import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';

const CartIcon = () => {

    const { isCartOpen, setIsCartOpen, totalCartItems } = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShopIcon/>
            <ItemCount> {totalCartItems} </ItemCount>
        </CartIconContainer>
    );
}

export default CartIcon;