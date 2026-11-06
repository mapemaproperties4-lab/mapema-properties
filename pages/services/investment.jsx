import React from "react";
import Footer from "../../components/Footer";
import FooterContacts from "../../components/FooterContacts";
import Nav from "../../components/Nav";
import Breadcrumbs from "../../components/widgets/Breadcrumbs";
import TopLocations from "../../components/TopLocations";
import ContactCTA from "../../components/ContactCTA";
import SocialMediaCTA from "../../components/SocialMediaCTA";
import TrendingSearch from "../../components/TrendingSearch";
import SEO from "../../components/SEO";

export default function JointVentures() {
  return (
    <>
      <SEO
        title="Investment"
        description="We advise you on the ROI of each class of property and help you
          structure your portfolio by availing to you data on current and future
          earning capacities of the investment in question."
        slug={`/services/investment`}
        img="/img/img-1.jpg"
      />
      <Nav />
      <Breadcrumbs
        title="Investment"
        breadcrumbs={[
          { title: "Home", link: "/" },
          {
            title: "Services",
            link: "/#services",
          },
        ]}
      />
      <section className="py-16 container max-w-5xl">
        <h1 className="font-bold mb-5 uppercase text-4xl md:text-6xl md:leading-[70px] font-serif text-center mx-auto max-w-4xl">
          Investment
        </h1>
        <p className="mx-auto md:text-xl text-center max-w-4xl">
          We advise you on the ROI of each class of property and help you
          structure your portfolio by availing to you data on current and future
          earning capacities of the investment in question.
        </p>
      </section>
      <img
        src="/img/img-1.jpg"
        alt="nairobi"
        className="w-full h-[400px] object-cover mb-10"
      />
      <h3 className="font-bold mb-5 uppercase text-4xl md:text-6xl md:leading-[70px] font-serif text-center mx-auto max-w-4xl">
        Contact Us
      </h3>
      <ContactCTA />
      <TrendingSearch />
      <SocialMediaCTA />
      <Footer />
    </>
  );
}
