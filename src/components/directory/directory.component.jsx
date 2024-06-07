import DirectoryItem from "../directory-item/directory-item.component";
import "./directory.styles.scss"


// component for the container housing the main list of categories listed on the home page
const Directory = (props) => {

  const { categories } = props;
    
    return (
        <div className="categories-container">
            {categories.map((category) => ( 
                <DirectoryItem key={category.id} category={category} />
            ))}
        </div>
    )
};

export default Directory;