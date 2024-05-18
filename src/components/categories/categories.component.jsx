import CategoryItem from "../category-item/category-item.component"
import "./categories.styles.scss"

const Categories = (props) => {

  const { categories } = props;
    
    return (
        <div className="categories-container">
            {categories.map((category) => ( 
                <CategoryItem key={category.id} category={category} />
            ))}
        </div>
    )
}

export default Categories