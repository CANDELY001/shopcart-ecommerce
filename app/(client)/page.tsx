import Container from "@/components/Container";
import Header from "@/components/Header";
import HomeBanner from "@/components/HomeBanner";
import HomeCategories from "@/components/HomeCategories";
import LatestBlog from "@/components/LatestBlog";
import ProductGrid from "@/components/ProductGrid";
import ShopByBrands from "@/components/ShopByBrands";
import { getCategories } from "@/sanity/queries";

const Home = async () => {
  const categories = await getCategories(6);
  console.log("Fetched Categories:", categories);
  return (
    <Container className="bg-shop-light-pink md:px-0 px-1">
      <HomeBanner />
      <div className="py-10">
        <ProductGrid />
        <HomeCategories categories={categories} />
        <ShopByBrands />
        <LatestBlog />
      </div>
    </Container>
  );
};
export default Home;
