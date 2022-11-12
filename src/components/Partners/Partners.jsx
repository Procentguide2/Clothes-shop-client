import partner1 from '../../images/partners/1.png';
import partner2 from '../../images/partners/2.png';
import partner3 from '../../images/partners/3.png';
import partner4 from '../../images/partners/4.png';
import partner5 from '../../images/partners/5.png';
import partner6 from '../../images/partners/6.png';

function Partners() {
  return (
    <div class="partners">
      <div class="container">
        <ul class="partners__list">
          <li class="partners__item"><img src={partner1} alt="partner logo" /></li>
          <li class="partners__item"><img src={partner2} alt="partner logo" /></li>
          <li class="partners__item"><img src={partner3} alt="partner logo" /></li>
          <li class="partners__item"><img src={partner4} alt="partner logo" /></li>
          <li class="partners__item"><img src={partner5} alt="partner logo" /></li>
          <li class="partners__item"><img src={partner6} alt="partner logo" /></li>
        </ul>
      </div>
    </div>
  );
}

export default Partners;