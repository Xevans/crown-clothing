import "./category-item-styles.scss"

const CategoryItem = ({category}) => {
    return (
        <div key={category.id} className="category-container">
        <div className="background-image" style={{
          backgroundImage: `url(${category.imageUrl})`
        }} />
        <div className="category-body-container">
          <h1>{category.title}</h1>
          <p>Shop Now</p>
        </div>
      </div>
    )
}

export default CategoryItem