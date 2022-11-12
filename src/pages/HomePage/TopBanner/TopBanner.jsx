import { Link } from 'react-router-dom';
import bg from '../../../images/slider/photo.png';
import Popover from '@mui/material/Popover';
import { useState } from 'react';


function TopBanner() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <section class="top-slider">
      <div class="container top-slider__container">
        <div class="top-slider__inner">
          <div class="top-slider__item">
            <div class="top-slider__content">
              <h3 class="top-slider__title">
                New Season <br />
                New Brand Collection
              </h3>
              <p class="top-slider__text">
                By choosing Malbo, you first and foremost get quality at an affordable price. We appreciate each of our customers, we are proud of the many positive reviews.
              </p>
              <button onClick={handleClick} class="top-slider__link">SEE NOW</button>
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div className='see-new'>
                  <Link to='/catalog?gender=man'>MAN</Link>
                  <Link to='/catalog?gender=woman'>WOMAN</Link>
                </div>
              </Popover>
            </div>
            <img class="top-slider__img" src={bg} alt="slide images" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopBanner;