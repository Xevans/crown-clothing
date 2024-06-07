import "./directory-item.styles.scss"


// individual directory items that appear on the home page
const DirectoryItem = ({category}) => {

    const { id, imageUrl, title, } = category;

    return (
      <div key={id} className="directory-item-container">
        <div className="background-image" style={{
          backgroundImage: `url(${imageUrl})`
        }} />
        <div className="directory-item-body-container">
          <h1>{title}</h1>
          <p>Shop Now</p>
        </div>
      </div>
    )
}

export default DirectoryItem