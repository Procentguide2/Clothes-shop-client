import { Link } from 'react-router-dom';
import { Box, Modal } from '@mui/material';
import { useState } from 'react';

function Footer({ userId }) {
  return (
    <>
      <footer class="footer">
        <div class="container">
          <div class="footer-top">
            <div class="footer-top__item footer-top__contact">
              <Link class="logo footer-top__logo" to="/">
                MALBO
              </Link>
              <a class="footer-top__address" href="https://www.google.com.ua/maps/place/342+Oxford+St,+London+W1C+1JG,+%D0%92%D0%B5%D0%BB%D0%B8%D0%BA%D0%BE%D0%B1%D1%80%D0%B8%D1%82%D0%B0%D0%BD%D0%B8%D1%8F/@51.5150214,-0.1500586,17z/data=!3m1!4b1!4m5!3m4!1s0x4876052cadf5f10b:0x6bcfd7a8b4d8e96a!8m2!3d51.5150214!4d-0.1478699?hl=ru">
                No. 342 - London Oxford Street,
                012 United States
              </a>
              <a class="footer-top__email" href="mailto:Youremail@gmail.com">malbo.catalog@gmail.com</a>
              <a class="footer-top__phone" href="tel:+02838388393">+0283 838 8393</a>
              <ul class="footer-top__social-list">
                <li class="footer-top__social-item">
                  <a class="footer-top__social-link" href="https://www.facebook.com/profile.php?id=100021369495538" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11pt"
                      height="18pt" viewBox="0 0 11 18" version="1.1">
                      <g>
                        <path
                          d="M 9.8125 9.84375 L 10.3125 6.675781 L 7.1875 6.675781 L 7.1875 4.617188 C 7.1875 3.753906 7.621094 2.910156 9.023438 2.910156 L 10.445312 2.910156 L 10.445312 0.214844 C 10.445312 0.214844 9.15625 0 7.925781 0 C 5.347656 0 3.667969 1.519531 3.667969 4.261719 L 3.667969 6.675781 L 0.804688 6.675781 L 0.804688 9.84375 L 3.667969 9.84375 L 3.667969 17.5 L 7.1875 17.5 L 7.1875 9.84375 Z M 9.8125 9.84375 " />
                      </g>
                    </svg>
                  </a>
                </li>
                <li class="footer-top__social-item">
                  <a class="footer-top__social-link" href="https://www.linkedin.com/in/denys-malofeiev-b49216207/" target="_blank">
                    <svg xmlns="http://www.w3.org/2000/svg" width="15pt"
                      height="17pt" viewBox="0 0 15 17" version="1.1">
                      <g>
                        <path
                          d="M 3.359375 14.875 L 0.246094 14.875 L 0.246094 4.945312 L 3.359375 4.945312 Z M 1.800781 3.589844 C 0.804688 3.589844 0 2.773438 0 1.785156 C 0 0.800781 0.804688 0 1.800781 0 C 2.796875 0 3.601562 0.800781 3.601562 1.785156 C 3.601562 2.773438 2.796875 3.589844 1.800781 3.589844 Z M 14.996094 14.875 L 11.894531 14.875 L 11.894531 10.039062 C 11.894531 8.886719 11.871094 7.410156 10.277344 7.410156 C 8.660156 7.410156 8.410156 8.664062 8.410156 9.957031 L 8.410156 14.875 L 5.304688 14.875 L 5.304688 4.945312 L 8.289062 4.945312 L 8.289062 6.296875 L 8.332031 6.296875 C 8.746094 5.519531 9.761719 4.695312 11.273438 4.695312 C 14.421875 4.695312 15 6.75 15 9.417969 L 15 14.875 Z M 14.996094 14.875 " />
                      </g>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div class="footer-top__item footer-top__nav">
              <h6 class="footer-top__title">Useful Links</h6>
              <ul class="footer-top__list">
                <li class="footer-top__item">
                  <a class="footer-top__link" href='https://www.privacypolicies.com/live/eb42f74f-e8f4-4f97-9371-e5857178cc26' target="_blank">Privacy Policy</a>
                </li>
                <li class="footer-top__item">
                  <a class="footer-top__link" href="https://www.termsandconditionsgenerator.com/live.php?token=TLPGMo3PGGbjIPk8CPI8DKEIN9nGW58T" target="_blank">Terms & Conditions</a>
                </li>
                <li class="footer-top__item">
                  <Link class="footer-top__link" to="/contact">Contact Us</Link>
                </li>
              </ul>
            </div>
            <div class="footer-top__item footer-top__nav">
              <h6 class="footer-top__title">My Account</h6>
              <ul class="footer-top__list">
                <li class="footer-top__item">
                  <Link class="footer-top__link" to={userId ? '/favoriten' : '/login'}>Favoriten</Link>
                </li>
                <li class="footer-top__item">
                  <Link class="footer-top__link" to="/login">Login</Link>
                </li>
                <li class="footer-top__item">
                  <Link class="footer-top__link" to='/register'>Registration</Link>
                </li>
              </ul>
            </div>
            <div class="footer-top__item footer-top__item-form">
              <h6 class="footer-top__title">About Us</h6>
              <p class="footer-top__text">
                The history of Malbo began in 2013. The founders - energetic and creative guys, brothers from a small town in the western part of Ukraine - decided to focus their activities on the development of Ukrainian streetwear culture. Ukrainians supported the youth brand and welcomed the appearance of new products.
              </p>
              {/* <form class="footer-top__form" action="#">
                <input class="footer-top__form-input" type="email" placeholder="Your email address" required />
                <button class="footer-top__form-btn" type="submit">Subscribe</button>
              </form> */}
            </div>
          </div>
          <div class="footer-bottom">
            <p class="footer-bottom__copy">© 2022 Denys & Karina AI-201. All Rights Reserved.</p>
            {/* <div class="footer-bottom__accept">
              We Accept
              <img class="footer-bottom__accept-img" src={paypal} alt="we accept paypal" />
            </div> */}
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
