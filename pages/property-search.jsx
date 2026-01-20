import { upperFirst } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Slash } from "react-feather";
import Footer from "../components/Footer";
import FooterContacts from "../components/FooterContacts";
import ListingCard from "../components/ListingCard";
import Nav from "../components/Nav";
import SearchForm from "../components/SearchForm";
import Breadcrumbs from "../components/widgets/Breadcrumbs";
import Pagination from "../components/widgets/Pagination";
import { NEXT_PUBLIC_TEAM_ID } from "../utils/constants";
import { objectToGetParams } from "../utils/objectToGetParams";
import SEO from "../components/SEO";
import { listingsAPI } from "../utils/listingsAPI";

export default function ListingListPage({ listings, totalCount }) {
  const router = useRouter();

  let pl = [
    { title: "Home", link: "/" },
    { title: "Properties", link: "/properties" },
  ];

  let searchParams = Object.keys(router.query);

  return (
    <>
      <SEO
        title="Search Properties"
        slug="/property-search"
        description="Find your dream property with Mapema Properties' advanced search tool. Explore a wide range of homes, apartments, and commercial spaces for sale or rent across Kenya. Filter by location, price, property type, and more to discover the perfect property that fits your needs. Start your search today"
      />
      <Nav />
      <Breadcrumbs title="Property Search" breadcrumbs={pl} />
      <section className="bg-charcoal pt-5 pb-2 text-white">
        <div className=" container max-w-5xl">
          <h1 className="font-bold uppercase text-5xl md:text-6xl font-serif text-center mx-auto max-w-4xl">
            Search Properties
          </h1>
        </div>
      </section>
      <SearchForm />

      <section className="container w-full grid gap-6 md:grid-cols-3 pb-4 mt-4">
        <div className=" bg-gray-100 md:col-span-3 px-2 py-4">
          <p className="uppercase text-sm">
            Showing results for:{" "}
            {searchParams.map((i) => (
              <b key={i}>{`${upperFirst(i)}: ${upperFirst(
                router.query[i]
              )}, `}</b>
            ))}
          </p>
        </div>
        {listings.length > 0 ? (
          listings.map((i) => <ListingCard key={i.id} data={i} />)
        ) : (
          <div className=" text-center md:col-span-3 px-2 py-4">
            <Slash className="h-24 mb-5 w-auto inline-block" />
            <h4 className="font-bold font-serif text-4xl uppercase">
              0 Listings Found
            </h4>
          </div>
        )}
      </section>

      <section className="container pb-10">
        <Pagination
          currentPage={router.query.page || 1}
          pathPrefix={"/" + router.query.category + "?page="}
          postsPerPage={10}
          totalPosts={totalCount}
        />
      </section>

      <FooterContacts />
      <Footer />
    </>
  );
}

export async function getServerSideProps({ params, query, req }) {
  let listings = [];
  let listingCount;

  try {
    const res = await listingsAPI({ query });
    listings = res.listings;

    // pagination
    listingCount = listings.length;
    const itemsPerPage = 12;

    if (query && query.page) {
      listings = listings.slice(
        query.page * itemsPerPage - itemsPerPage,
        query.page * itemsPerPage
      );
    } else {
      listings = listings.slice(0, itemsPerPage);
    }
  } catch (err) {
    console.log(err);
    return {
      notFound: true,
    };
  }

  return {
    props: { listings, totalCount: listingCount },
  };
}
