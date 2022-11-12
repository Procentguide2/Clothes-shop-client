import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';

function CategoriesInfo() {
  return (
    <section class="categories-info">
      <div class="categories-info__inner">
        <div class="container">
          <div class="info">
            <div class="info__item">
              <div style={{ background: 'rgb(255, 181, 52)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <GradeOutlinedIcon style={{ color: '#fff', width: '35px', height: '35px',}}/>
              </div>
              <h5 class="info__item-title">High Quality</h5>
              <p class="info__item-text">
                We care a lot about the quality of our product.
              </p>
            </div>
            <div class="info__item">
              <div style={{ background: 'rgb(52, 195, 255)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LoyaltyOutlinedIcon style={{ color: '#fff', width: '35px', height: '35px', }} />
              </div>
              <h5 class="info__item-title">Loyalty Program</h5>
              <p class="info__item-text">
                Our store has special discounts for regular customers
              </p>
            </div>
            <div class="info__item">
              <div style={{ background: 'rgb(254, 62, 87)', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <SupportAgentOutlinedIcon style={{ color: '#fff', width: '35px', height: '35px', }} />
              </div>
              <h5 class="info__item-title">Customer Support</h5>
              <p class="info__item-text">
                If you have some questions, please contact us.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CategoriesInfo