import { Link } from 'react-router-dom';
import img from '../../images/404.png';

function NotFoundPage() {
  return (
    <div className="NotFoundPage">
      <main class="main">
        <section class="page-404">
          <div class="container">
            <div class="page-404__inner">
              <div class="page-404__content">
                <h2 class="page-404__title">OPPS! Page Not Found!!</h2>
                <p class="page-404__text">
                  We,re sorry but we can’t seem to find the pages you request. This might be because you have typed the web
                  address not find incorrectly.
                </p>
                <Link class="page-404__link" to="/">BACK TO HOME</Link>
              </div>
              <img class="page-404__img" src={img} alt="404 images"/>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default NotFoundPage;