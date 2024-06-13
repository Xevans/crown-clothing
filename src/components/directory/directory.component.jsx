import DirectoryItem from "../directory-item/directory-item.component";
import {CategoriesContainer} from "./directory.styles.jsx"


// component for the container housing the main list of categories listed on the home page
const Directory = (props) => {

  const { categories } = props;
    
    return (
        <CategoriesContainer>
            {categories.map((category) => ( 
                <DirectoryItem key={category.id} category={category} />
            ))}
        </CategoriesContainer>
    )
};

export default Directory;