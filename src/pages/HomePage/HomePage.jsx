import Partners from "../../components/Partners/Partners";
import CategoriesInfo from "./CategoriesInfo/CategoriesInfo";
import Products from "./Products/Products";
import TopBanner from "./TopBanner/TopBanner";

function HomePage() {
  return (
    <div className="HomePage">
      <main class="main">
        <TopBanner/>
        <CategoriesInfo/>
        <Products />
        <Partners />
      </main>
    </div>
  );
}

export default HomePage;
