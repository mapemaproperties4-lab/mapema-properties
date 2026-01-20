import { includes, snakeCase } from "lodash";
import { upperFirst } from "lodash";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { PhoneCall, Search, Slash } from "react-feather";
import ContactCTA from "../components/ContactCTA";
import Footer from "../components/Footer";
import FooterContacts from "../components/FooterContacts";
import ListingCard from "../components/ListingCard";
import Nav from "../components/Nav";
import PropertyLinks from "../components/PropertyLinks";
import SearchForm from "../components/SearchForm";
import Breadcrumbs from "../components/widgets/Breadcrumbs";
import Pagination from "../components/widgets/Pagination";
import { NEXT_PUBLIC_TEAM_ID } from "../utils/constants";
import createTopLinks from "../utils/createTopLinks";
import getQueryFromUrl from "../utils/getQueryFromURL";
import { isPropertyType } from "../utils/isPropertyType";
import SEO from "../components/SEO";
import { listingsAPI } from "../utils/listingsAPI";

export default function ListingListPage({ listings, totalCount }) {
  const router = useRouter();
  const [showSearchForm, setShowSearchForm] = useState(false);

  const pageDetails = getQueryFromUrl(router.query.category);
  const { propertyTypeQuery, offerQuery, locationQuery } = pageDetails;

  const topLinks = createTopLinks(
    offerQuery !== "NONE" ? offerQuery : null,
    locationQuery !== "NONE" ? locationQuery.replaceAll("_", " ") : null
  );

  let c = `${upperFirst(propertyTypeQuery)}${
    propertyTypeQuery !== "properties" ? "s" : ""
  }`.replace("_", "/");
  let d = offerQuery !== "NONE" ? "for " + offerQuery : "";
  let e = locationQuery !== "NONE" ? "in " + locationQuery : "";
  let pageTitle = `${c} ${d} ${e}`;
  let description = `${pageTitle}`;
  let pl = [
    { title: "Home", link: "/" },
    { title: "Properties", link: "/properties" },
  ];
  let backgroundImg = "/img/land-4.jpg";

  return (
    <>
      <Nav />
      <SEO title={pageTitle} description={description} slug={router.asPath} />
      <Breadcrumbs title={pageTitle} breadcrumbs={pl} />
      <section
        className="min-h-[160px] bg-cover bg-no-repeat bg-[50%_70%] relative"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="min-h-[160px] inset-0 bg-slate-800/50 py-6">
          <div className="container">
            <h1 className="font-bold font-serif uppercase">
              <span className="text-2xl md:text-4xl text-white/70 block mb-2">
                Our Properties
              </span>
              <span className="text-3xl md:text-6xl text-white block">
                {pageTitle}
              </span>
            </h1>
          </div>
        </div>
      </section>
      <div className="bg-charcoal py-4 text-white">
        <div className="container flex flex-wrap flex-col-reverse md:flex-row gap-2">
          <button
            onClick={() => setShowSearchForm(!showSearchForm)}
            className={`${
              showSearchForm && "angle"
            } group px-6 py-2.5 w-full md:w-auto bg-accent uppercase rounded-sm flex items-center text-black`}
          >
            <Search className="mr-4" />
            <span>Search Properties</span>
          </button>
          <button
            onClick={() => router.push("/contact-us")}
            className="group px-6 py-2.5 w-full md:w-auto bg-white hover:bg-white/80 uppercase rounded-sm flex items-center text-black"
          >
            <PhoneCall className="mr-4" />
            <span>Request</span>
          </button>
        </div>
      </div>
      {showSearchForm && <SearchForm />}
      <section className="container w-full grid gap-6 md:grid-cols-3 pb-4 mt-4">
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
          currentPage={router.query.page ? parseInt(router.query.page) : 1}
          pathPrefix={"/" + router.query.category}
          postsPerPage={12}
          totalPosts={totalCount}
        />
      </section>
      <section className="py-6 bg-gray-200">
        <div className="container">
          <PropertyLinks {...topLinks} />
        </div>
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
    const data = await listingsAPI({query:{
      published: true
    }});
    listings = data.listings;

    let queryFromUrl = getQueryFromUrl(params.category);
    console.log(queryFromUrl);

    // filter results by property type
    const filterByType = (l) => {
      if (queryFromUrl.propertyTypeQuery === "properties") {
        return l;
      } else {
        let r = l.filter(
          (i) => i.property_type === queryFromUrl.propertyTypeQuery
        );

        return r;
      }
    };

    // filter results by location
    const filterByLocation = (l) => {
      if (queryFromUrl.locationQuery === "NONE") {
        return l;
      } else {
        let r = l.filter((i) =>
          includes(
            snakeCase(
              `${i.region || ""} ${i.town_suburb || ""} ${i.address || ""}`
            ),
            queryFromUrl.locationQuery
          )
        );

        return r;
      }
    };

    // filter results by offer
    const filterByOffer = (l) => {
      if (queryFromUrl.offerQuery === "NONE") {
        return l;
      } else {
        let r = l.filter((i) => i.offer === queryFromUrl.offerQuery);

        return r;
      }
    };

    listings = filterByType(listings);
    listings = filterByLocation(listings);
    listings = filterByOffer(listings);

    // handle 404 pages
    if (
      listings.length === 0 &&
      !isPropertyType(queryFromUrl.propertyTypeQuery)
    ) {
      return {
        notFound: true,
      };
    }

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
