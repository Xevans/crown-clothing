import { useNavigate } from "react-router-dom";
import { BackgroundImage, DirectoryItemContainer, Body} from "./directory-item.styles.jsx"

// individual directory items that appear on the home page
const DirectoryItem = ({category}) => {

    const { id, imageUrl, title, route } = category;

    /* Use navigate allows you to give a component routing capability as opposed to wrapping components in a Link component */
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route); 

    return (
      <DirectoryItemContainer key={id} onClick={onNavigateHandler}>
        <BackgroundImage imageUrl={imageUrl} />
        <Body>
          <h1>{title}</h1>
          <p>Shop Now</p>
        </Body>
      </DirectoryItemContainer>
    )
}

export default DirectoryItem;