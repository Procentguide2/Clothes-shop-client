import { Link } from 'react-router-dom';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import PersonIcon from '@mui/icons-material/Person';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { Popover } from '@mui/material';
import React from 'react';
import LoginPopover from '../LoginPopover/LoginPopover';
import CartPopover from '../CartPopover.jsx/CartPopover';
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

function Header({ favorite, userId }) {
  const navigate = useNavigate();
  const [userPopover, setUserPopover] = React.useState(null);
  const handleClickUser = (event) => { setUserPopover(event.currentTarget) };
  const handleCloseUser = () => { setUserPopover(null) };

  const [cartPopover, setCartPopover] = React.useState(null);
  const handleClickCart = (event) => {
    if (userId === null) {
      navigate('/login')
    } else {
      setCartPopover(event.currentTarget)
    }
  };
  const handleCloseCart = () => { setCartPopover(null) };

  const openUser = Boolean(userPopover);
  const openCart = Boolean(cartPopover);

  const {allColors, allCategories} = useSelector(state => state.app)

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <Link className="logo" to="/">
            MALBO
          </Link>
          <nav className="menu">
            <ul className="menu__list">
              <li className="menu__list-item">
                <Link className="menu__list-link" to="/catalog?gender=man">Man</Link>
              </li>
              <li className="menu__list-item">
                <Link className="menu__list-link" to="/catalog?gender=woman">Woman</Link>
              </li>
            </ul>
          </nav>
          <div className="user-nav">
            <div
              onClick={handleClickUser}
              className="user-nav__link"
            >
              <PersonIcon />
            </div>
            <Popover
              id="mouse-over-popover-user"
              open={openUser}
              anchorEl={userPopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={handleCloseUser}
              elevation={2}
            >
              <LoginPopover handleClose={handleCloseUser} />
            </Popover>
            <Link className="user-nav__link" to="/contact">
              <EmailOutlinedIcon />
            </Link>

            <div className="user-nav__link" onClick={handleClickCart}>
              <FavoriteOutlinedIcon />
              {favorite?.products.length ? <span className="user-nav__num">{favorite?.products.length}</span> : ''}
              
            </div>

            <Popover
              id="mouse-over-popover-cart"
              open={openCart}
              anchorEl={cartPopover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={handleCloseCart}
              elevation={2}
            >
              <CartPopover handleClose={handleCloseCart} favorite={favorite?.products} allColors={allColors} allCategories={allCategories}/>
            </Popover>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
