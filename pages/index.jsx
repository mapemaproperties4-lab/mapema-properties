import ContactCTA from "../components/ContactCTA";
import FeaturedProperties from "../components/FeaturedProperties";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HomeBloglist from "../components/HomeBlogList";
import HomeNumbers from "../components/HomeNumbers";
import HomeServices from "../components/HomeServices";
import HomeTeam from "../components/HomeTeam";
import Nav from "../components/Nav";
import SEO from "../components/SEO";
import SocialMediaCTA from "../components/SocialMediaCTA";
import TopLocations from "../components/TopLocations";
import TrendingSearch from "../components/TrendingSearch";

import data from "../data.json";

import { listingsAPI } from "../utils/listingsAPI";

export default function Home(props) {
  return (
    <>
      <SEO />
      <Nav />
      <Hero />
      <FeaturedProperties properties={props.listings} />
      <TopLocations />
      <HomeTeam />
      <HomeServices />
      <HomeBloglist posts={data.blogs} />
      {/* <TrendingSearch /> */}
      <SocialMediaCTA />
      <Footer />
    </>
  );
}

export async function getServerSideProps() {
  const { listings } = await listingsAPI({ query: { limit: 6 } });
  return { props: { listings } };
}
