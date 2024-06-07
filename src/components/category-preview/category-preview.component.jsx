import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';

import './category-preview.styles.scss'

const CategoryPreview = ({ title, products }) => {
    
    return(
        
        <div className='category-preview-container'>
            <h2>
                <Link to={title} className='title' >{title.toUpperCase()}</Link> {/* Since shop has nested routing set up, this child component will route within shop e.g. 'shop/hats' */}
            </h2>
            <div className='preview'>
                {// keep indexes 0 - 4, filter out everything else [show the first 4 products in they map]
                    products.filter((_, idx) => idx < 4).map((product) => {
                    return (
                        <ProductCard key={product.id} product={product} />
                        )
                })}
            </div>
        </div>
    );
};

export default CategoryPreview;