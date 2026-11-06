import React from "react";
import Footer from "../../components/Footer";
import FooterContacts from "../../components/FooterContacts";
import Nav from "../../components/Nav";
import Breadcrumbs from "../../components/widgets/Breadcrumbs";
import TopLocations from "../../components/TopLocations";
import SEO from "../../components/SEO";

export default function LandSellers() {
  return (
    <>
      <SEO
        title="Rent with us"
        description="Rent with us and we guarantee you a smooth rental experience. Our team
          of rental specialists will handle the entire rental process from start
          to finish. We have a wide range of rental properties across Kenya to
          suit your needs. We offer fair and competitive rental prices along
          with flexible lease terms"
        slug={`/services/letting`}
        img="/img/house-8.jpeg"
      />
      <Nav />
      <Breadcrumbs
        title="Rent with us"
        breadcrumbs={[
          { title: "Home", link: "/" },
          {
            title: "Services",
            link: "/#services",
          },
        ]}
      />
      <section className="py-16 container max-w-5xl">
        <h1 className="font-bold mb-5 text-4xl md:text-6xl font-serif text-center mx-auto max-w-4xl">
          Find your perfect home
        </h1>
        <p className="mx-auto md:text-xl text-center max-w-4xl">
          Rent with us and we guarantee you a smooth rental experience. Our team
          of rental specialists will handle the entire rental process from start
          to finish. We have a wide range of rental properties across Kenya to
          suit your needs. We offer fair and competitive rental prices along
          with flexible lease terms
        </p>
      </section>
      <img
        src="/img/house-8.jpeg"
        alt="nairobi properties"
        className="w-full h-[300px] object-cover rounded-t-3xl"
      />
      <TopLocations />
      <FooterContacts />
      <Footer />
    </>
  );
}
