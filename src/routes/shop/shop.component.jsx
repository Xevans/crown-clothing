import { Routes, Route } from 'react-router-dom';

import Category from '../category/category.component';
import CategoriesPreview from '../categories-preview/categories-preview.component';

import './shop.styles.scss';

const Shop = () => {

    return (
        <Routes>
        {/*Recall that since we gave 'shop' a '/*' in App.js It can now do nested routing */}
            <Route index element={<CategoriesPreview />} /> {/* Recal, index is what will render when you are at the parent level url (in this case /shop)*/}
            <Route path=":category" element={<Category />} /> 
        </Routes>
    );
};

export default Shop;