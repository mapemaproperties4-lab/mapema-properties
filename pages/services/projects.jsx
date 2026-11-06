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
        title="Projects"
        description="ZURAFA has proven marketing strategies to acquire bulk sales. We
          manage the site agents , execute client follow up, coordinate the
          sales process so that you can focus on developing the property"
        slug="/services/projects"
        img="/img/filtergrade-4T4AcGJvARQ-unsplash.jpg"
      />
      <Nav />
      <Breadcrumbs
        title="Projects"
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
          Projects
        </h1>
        <p className="mx-auto md:text-xl text-center max-w-4xl">
          ZURAFA has proven marketing strategies to acquire bulk sales. We
          manage the site agents , execute client follow up, coordinate the
          sales process so that you can focus on developing the property
        </p>
      </section>
      <img
        src="/img/filtergrade-4T4AcGJvARQ-unsplash.jpg"
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
