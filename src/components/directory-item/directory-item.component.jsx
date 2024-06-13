import { BackgroundImage, DirectoryItemContainer, Body} from "./directory-item.styles.jsx"


// individual directory items that appear on the home page
const DirectoryItem = ({category}) => {

    const { id, imageUrl, title, } = category;

    return (
      <DirectoryItemContainer key={id}>
        <BackgroundImage imageUrl={imageUrl} />
        <Body>
          <h1>{title}</h1>
          <p>Shop Now</p>
        </Body>
      </DirectoryItemContainer>
    )
}

export default DirectoryItem