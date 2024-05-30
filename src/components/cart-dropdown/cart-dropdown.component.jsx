import './cart-dropdown.styles.scss';
import Button from '../buttons/button.component';

const CartDropdown = () => {
    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                <Button buttonType='inverted'>Checkout</Button>
            </div>
        </div>
    );
};

export default CartDropdown;