import {ProductCardContainer, Footer, Name, Price, CardButton} from './product-card.styles.jsx'
import { BUTTON_TYPES } from '../buttons/button.component';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const {addItemToCart} = useContext(CartContext);

    const addProductToCart = () => addItemToCart(product);

    return (
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name>{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <CardButton buttonType={BUTTON_TYPES.inverted} onClick={addProductToCart}>Add to cart</CardButton>
        </ProductCardContainer>
    );
};

export default ProductCard;