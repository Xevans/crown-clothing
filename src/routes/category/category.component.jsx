import { useContext, useState, useEffect, Fragment} from 'react';
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';

import { CategoryContainer, CategoryPageTitle } from './category.styles.jsx'

const Category = () => {
    
    const { category } = useParams();
    const { categoriesMap } = useContext(CategoriesContext)
    const [products, setProducts] = useState(categoriesMap[category]);


    // if the category param in the url ever changes, set the products
    // to the category of items matching the url
    
    /*
    Recall the visualization of our map retried from firestore.
    categories = {
        hats =
        [
            id:
            imageUrl:
            ...
        ],
        jackets =
        [
            ...
        ],
        ...

    }
    */
    useEffect( () => {
        setProducts(categoriesMap[category]); // e.g. if url param equals 'jackets', set products equal to the jackets collection. Returns the collection as an array.
    }, [category, categoriesMap]);

    return(

        <Fragment>
            <CategoryPageTitle> {category.toLocaleUpperCase()} </CategoryPageTitle>
        
            <CategoryContainer>
                {
                    // && checks if products exist
                    // if true, then the we map and render.
                    // we do this to gaurd against an error from mapping an empty map
                    // which happens because the fetching of data happends asynchronously, while this component tries to render. 
                    products && products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                ))}
            </CategoryContainer>
        </Fragment>
    );
};

export default Category;