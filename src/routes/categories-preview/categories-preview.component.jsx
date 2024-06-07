import { Fragment, useContext } from 'react';

import { CategoriesContext } from '../../contexts/categories.context';
import CategoryPreview from '../../components/category-preview/category-preview.component';


const CategoriesPreview = () => {

    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <Fragment>
            {Object.keys(categoriesMap).map((title) => {
                const products = categoriesMap[title]; // extract title from current iteration map object e.g. 'hats'
                return <CategoryPreview key={title} title={title} products={products} />
            })}
        </Fragment>
    );
};

export default CategoriesPreview;