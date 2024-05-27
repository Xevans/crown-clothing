import { Fragment } from 'react'
import { Outlet, Link } from 'react-router-dom'; // for rendering nested route components
import './navigation.styles.scss'
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg' // turn a static file into a react component

const Navigation = () => {
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
                <Link className='nav-link' to='/auth'> {/* Adding links with react router is done this way */ }
                    LOG IN
                </Link>
            </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation;