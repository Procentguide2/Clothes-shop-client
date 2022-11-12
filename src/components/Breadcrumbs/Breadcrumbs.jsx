import { Link } from 'react-router-dom';
import bgWoman from '../../images/woman-banner.jpg';
import bgMan from '../../images/man-banner.jpg';
import bg from '../../images/general-banner.jpg';
import { useSearchParams } from 'react-router-dom';

function Breadcrumbs({ title }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const gender = searchParams.get('gender');

  return (
    <section class="top">
      <div class="top__container" style={{ backgroundImage: `url(${gender === 'woman' ? bgWoman : gender === 'man' ? bgMan : bg} )` }}>
        <div class="container">
          <h2 class="top__title title">
            {title}
          </h2>
          <div class="breadcrumbs">
            <ul class="breadcrumbs__list">
              <li class="breadcrumbs__item">
                <Link class="breadcrumbs__link" to="/">
                  Home
                </Link>
              </li>
              <li class="breadcrumbs__item">
                <Link class="breadcrumbs__link" to={`/${title}`}>
                  {title.charAt(0).toUpperCase() + title.slice(1)}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Breadcrumbs;