import React from "react";
import Footer from "../../components/Footer";
import FooterContacts from "../../components/FooterContacts";
import Nav from "../../components/Nav";
import Breadcrumbs from "../../components/widgets/Breadcrumbs";
import ContactCTA from "../../components/ContactCTA";
import SocialMediaCTA from "../../components/SocialMediaCTA";
import TrendingSearch from "../../components/TrendingSearch";
import SEO from "../../components/SEO";

export default function JointVentures() {
  return (
    <>
      <SEO
        title="Valuation"
        description="In conjunction with our trusted partners, we will provide you with the
          actual market rate of your property that has taken into account the
          location, features, amenities, condition etc."
        slug="/services/valuation"
        img="/img/legal.jpg"
      />
      <Nav />
      <Breadcrumbs
        title="Valuation"
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
          Valuation
        </h1>
        <p className="mx-auto md:text-xl text-center max-w-4xl">
          In conjunction with our trusted partners, we will provide you with the
          actual market rate of your property that has taken into account the
          location, features, amenities, condition etc., so that you can make
          informed decisions.
        </p>
      </section>
      <img
        src="/img/legal.jpg"
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
