import { CheckCircle } from "react-feather";
import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Breadcrumbs from "../components/widgets/Breadcrumbs";
import FooterContacts from "../components/FooterContacts";
import SEO from "../components/SEO";

export default function LocationsPage() {
  return (
    <>
      <SEO title="Message Sent" />
      <Nav />
      <Breadcrumbs
        title="Success"
        breadcrumbs={[{ title: "Home", link: "/" }]}
      />
      <section className="py-14 container max-w-5xl text-center">
        <div className="w-[140px] h-[140px] inline-flex justify-center items-center rounded-full border bg-white mb-5">
          <CheckCircle size={80} aria-hidden="true" />
        </div>
        <h1 className="font-bold uppercase text-5xl md:text-6xl mb-5 font-serif text-center mx-auto max-w-4xl">
          Request Submitted
        </h1>
        <p className="mx-auto md:text-xl text-center max-w-3xl">
          Thank you for your request. Our team will get back to you soon.
        </p>
      </section>

      <FooterContacts />
      <Footer />
    </>
  );
}
