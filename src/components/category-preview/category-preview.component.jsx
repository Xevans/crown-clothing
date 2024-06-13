import ProductCard from '../product-card/product-card.component';

import { CategoryPreviewContainer, Title, Preview} from './category-preview.styles.jsx'

const CategoryPreview = ({ title, products }) => {
    
    return(
        
        <CategoryPreviewContainer>
            <h2>
                <Title to={title}> {title.toUpperCase()}</Title> {/* Since shop has nested routing set up, this child component will route within shop e.g. 'shop/hats' */}
            </h2>
            <Preview>
                {// keep indexes 0 - 4, filter out everything else [show the first 4 products in they map]
                    products.filter((_, idx) => idx < 4).map((product) => {
                    return (
                        <ProductCard key={product.id} product={product} />
                        )
                })}
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;