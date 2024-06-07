import { Fragment, useContext } from 'react'
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import { Outlet, Link } from 'react-router-dom'; // for rendering nested route components
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon-component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg' // turn a static file into a react component


const Navigation = () => {

    const { currentUser } = useContext(UserContext); // we destruction the current user because we simply want the current user object saved to the user context for this component
    const { isCartOpen, setCartOpen } = useContext(CartContext);

    return(
      <Fragment> {/* Fragment allows you to add a parent level tag without rendering anything. As opposed to having a div */}
        <div className='navigation'>
            <Link className='logo-container' to='/'>
            <CrwnLogo className='logo' />
            </Link>
            <div className='nav-links-container'>
                <Link className='nav-link' to='/shop'> {/* Adding links with react router is done this way */ }
                    SHOP
                </Link>

                { // if a current user exists (not null), show 'LOG OUT', otherwise, show 'LOG IN'.
                  currentUser ? ( 
                    <span className='nav-link' onClick={signOutUser}>LOG OUT</span>
                  ) : 
                  (
                    <Link className='nav-link' to='/auth'> {/* Adding links with react router is done this way */ }
                      LOG IN
                    </Link>
                  )
                }
                <CartIcon />
            </div>
            { /* Cant use an if statement here, so wed use &&. */
              /* && checks if both sides are true. if not it returns false. This works for us because a component will always return true, so we essentially check isCartOpen */
              isCartOpen && <CartDropdown />
            }
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;