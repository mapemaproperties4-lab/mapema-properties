import React from "react";
import Footer from "../../components/Footer";
import FooterContacts from "../../components/FooterContacts";
import Nav from "../../components/Nav";
import Breadcrumbs from "../../components/widgets/Breadcrumbs";
import TopLocations from "../../components/TopLocations";
import SEO from "../../components/SEO";

export default function JointVentures() {
  return (
    <>
      <SEO
        title="Sellers"
        description="Sell with us, and we will get you the best price for your property in
          the market. Our team of professionals will handle your property sale
          from start to finish."
        slug="/services/selling"
        img="/img/img-5.jpg"
      />
      <Nav />
      <Breadcrumbs
        title="Sellers"
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
          Sale with us
        </h1>
        <p className="mx-auto md:text-xl text-center max-w-4xl">
          Sell with us, and we will get you the best price for your property in
          the market. Our team of professionals will handle your property sale
          from start to finish. We will handle the property valuation, listing,
          marketing, and negotiation to get you the best deal. You can trust our
          team of experienced agents and property consultants to sell your
          property quickly and at the best price.
        </p>
      </section>
      <img
        src="/img/img-5.jpg"
        alt="nairobi"
        className="w-full h-[300px] object-cover"
      />
      <TopLocations />
      <FooterContacts />
      <Footer />
    </>
  );
}
