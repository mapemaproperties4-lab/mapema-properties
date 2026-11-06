import { kebabCase, snakeCase, truncate, upperFirst } from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import {
  Calendar,
  Check,
  ChevronDown,
  Image,
  Info,
  Mail,
  PhoneCall,
  Share2,
} from "react-feather";
import AgentCard from "../../components/AgentCard";
import BookViewingForm from "../../components/BookViewingForm";
import Footer from "../../components/Footer";
import Nav from "../../components/Nav";
import PropertyGallery from "../../components/PropertyGallery";
import PropertyLinks from "../../components/PropertyLinks";
import RelatedProperties from "../../components/RelatedProperties";
import Breadcrumbs from "../../components/widgets/Breadcrumbs";
import { SITE_URL } from "../../utils/constants";
import createTopLinks from "../../utils/createTopLinks";
import { getStructuredFeatures } from "../../utils/getStructuredFeatures";
import { numberWithCommas } from "../../utils/numberWithCommas";
import { attributes } from "../../content/settings.md";
import SocialShare from "../../components/widgets/SocialShare";
import SEO from "../../components/SEO";
import MorgageCalculator from "../../components/MorgageCalculator";
import { getListings } from "../../lib/publicListings";
import { propertySlug } from "../../utils/propertySlug";

export default function PropertyPage({ data: listing, related }) {
  const router = useRouter();
  const [showSlider, setShowSlider] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [focusAgent, setFocusAgent] = useState(false);
  React.useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "AW-17134312120/RVu3CPm83JYbELi1o-o_",
      });
    }
  }, []);

  const listingTitle =
    listing.marketing_title ||
    `${upperFirst(listing.property_type)} for ${listing.offer} at ${
      listing?.address || listing?.town_suburb
    }`;

  const features = getStructuredFeatures(listing.features || []);
  const topLinks = createTopLinks(
    listing.offer,
    listing.town_suburb || listing.region
  );

  const handleClickViewing = () => {
    if (typeof window !== "undefined") {
      let target = document.getElementById("book-viewing");

      window.scrollTo({ top: target.offsetTop - 120, behavior: "smooth" });
    }
  };

  return (
    <>
      <Nav />
      <SEO
        title={listing.marketing_title || listingTitle}
        slug={`/properties/${propertySlug(listing)}`}
        img={
          listing?.images && listing.images.length > 0
            ? listing.cover?.url || listing.images[0].url
            : "/img/land.jpg"
        }
        description={truncate(listing.description, { length: 200 })}
      />
      <Breadcrumbs
        title={listingTitle}
        breadcrumbs={[
          { title: "Properties", link: "/properties" },
          {
            title: listing.region,
            link: `/properties-for-${listing.offer}-in-${snakeCase(
              listing.region
            )}`,
          },
        ]}
      />
      <header className="container mt-3">
        <div className="mb-5 mt-8">
          <h1 className="text-3xl md:text-4xl font-bold font-serif uppercase text-black block mb-3">
            {listing.marketing_title || listingTitle}
          </h1>
          <div className="flex gap-4 flex-wrap mt-4">
            <button
              onClick={() => setFocusAgent(true)}
              className="group px-6 py-2.5 w-auto bg-gold hover:bg-gold/80 uppercase rounded-sm flex items-center text-black rounded-tr-2xl"
            >
              <PhoneCall className="mr-4" />
              <span>Enquire</span>
            </button>
            <button
              disabled={!listing.images.length}
              onClick={() => setShowSlider(true)}
              className="group px-6 py-2.5 w-auto bg-primary text-white hover:bg-primary/90 uppercase rounded-sm flex items-center rounded-tr-2xl"
            >
              <Image className="mr-4" />
              <span>View Images</span>
            </button>
          </div>
        </div>
        <PropertyGallery
          images={listing.images}
          altTitle={listingTitle}
          showSlider={showSlider}
          setShowSlider={setShowSlider}
        />
      </header>
      <section className="container my-6">
        <div className="flex flex-wrap my-8">
          <div className="w-full md:w-3/4 md:pr-4">
            <div className="grid grid-cols-2 md:grid-cols-3 mb-6 gap-2">
              <div className="flex items-center p-4 w-full py-6 bg-gray-200">
                <img
                  src="/img/bedroom.png"
                  alt="bedrooms"
                  className="h-10 w-auto mr-3"
                />
                <span className="text-base md:text-xl">
                  {listing.bedroom_count || "-"}
                </span>
              </div>
              <div className="flex items-center p-4 w-full py-6 bg-gray-200">
                <img
                  src="/img/bathtub.png"
                  alt="bathrooms"
                  className="h-8 w-auto mr-3"
                />
                <span className="text-base md:text-xl">
                  {listing.bathroom_count || "-"}
                </span>
              </div>
              <div className="flex items-center p-4 w-full py-6 bg-gray-200">
                <img
                  src="/img/floor-size.png"
                  alt="size"
                  className="h-8 w-auto mr-3"
                />
                <span className="text-base md:text-xl">
                  {listing.property_type === "land_plot"
                    ? `${listing.size} ${listing.size_unit}`
                    : `${listing?.floor_size || "-"} ${listing.floor_size_unit}`}
                </span>
              </div>
              {/* <div className="flex items-center p-4 w-full py-6 bg-gray-200">
                <span className="text-base uppercase md:text-xl">
                  {listing.property_type}
                </span>
              </div> */}
            </div>
            <div className="mb-4">
              <span className="text-primary">Listing Ref: # {listing.id}</span>
            </div>
            <article
              style={showMore ? { height: "auto" } : { height: 240 }}
              className="text-gray-700 text-xl overflow-y-hidden"
            >
              {listing.description?.split(/\r?\n/).map((p, index) => (
                <p key={index} className="mb-2">
                  {p}
                </p>
              ))}
            </article>
            <button
              onClick={() => setShowMore(!showMore)}
              className="p-2 px-4 mt-3 mb-1 bg-gray-200 hover:bg-blue-200 rounded-md flex items-center"
            >
              <ChevronDown
                className={`h-6 w-auto text-tertiary mr-3 ${
                  showMore && "rotate-180"
                } transition-all duration-300`}
              />
              <span>{showMore ? "Show Less" : "Read More"}</span>
            </button>
            <section className="my-4 w-full bg-white border rounded p-4 md:p-10">
              <h2 className="font-bold font-serif text-3xl uppercase mb-1">
                Summary
              </h2>
              <div className="h-1 bg-gold w-32 mt-3"></div>
              <div className="w-full mt-6">
                <DetailsCard title="Property Ref" value={`# ${listing.id}`} />
                <DetailsCard
                  title="Property Status"
                  value={`For ${listing.offer}`}
                />
                <DetailsCard
                  title="Property Type"
                  value={listing.property_type}
                />
                <DetailsCard
                  title="Location"
                  value={`${listing.town_suburb || "-"}, ${
                    listing.region || "-"
                  }`}
                />
                <DetailsCard title="Address" value={listing.address} />
                <DetailsCard
                  title={listing.offer === "sale" ? "Sale Price" : "Rent Price"}
                  value={`${listing.price_unit} ${numberWithCommas(
                    (listing.offer === "sale" ? listing.sale_price : listing.rent_price) ?? "-"
                  )}`}
                />
                <DetailsCard
                  title="Bedrooms"
                  value={listing.bedroom_count || "-"}
                />
                <DetailsCard
                  title="Bathrooms"
                  value={listing.bathroom_count || "-"}
                />
                <DetailsCard
                  title="Size"
                  value={
                    listing.property_type === "land_plot"
                      ? `${listing.size} ${listing.size_unit}`
                      : `${listing?.floor_size || "-"} ${
                          listing.floor_size_unit
                        }`
                  }
                />
                <DetailsCard
                  title="Furnishing"
                  value={`${listing.furnishing || "-"}`}
                />
              </div>
              <div className="-mx-4 md:-mx-10 my-10 border-b md:w-[calc(100%+80px)]"></div>
              <h2 className="font-bold font-serif text-3xl uppercase mb-1">
                Amenities
              </h2>
              <p className="text-sm text-gray-500">
                {listing?.features ? listing?.features.length : "0"} amenities
                and features.
              </p>
              {Boolean(listing.features) && (
                <div className="block">
                  {features.internal.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold mb-3">
                        Internal Features
                      </h3>
                      <ul>
                        {features.internal.map((i) => (
                          <li
                            key={i}
                            className="inline-flex items-center mb-2 w-1/2 lg:w-1/3 text-gray-700"
                          >
                            <Check className="text-green-500 mr-2" />
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {features.external.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold mb-3">
                        External Features
                      </h3>
                      <ul>
                        {features.external.map((i) => (
                          <li
                            key={i}
                            className="inline-flex items-center mb-2 w-1/2 lg:w-1/3 text-gray-700"
                          >
                            <Check className="text-green-500 mr-2" />
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {features.nearby.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold mb-3">
                        Nearby Amenities
                      </h3>
                      <ul>
                        {features.nearby.map((i) => (
                          <li
                            key={i}
                            className="inline-flex items-center mb-2 w-1/2 lg:w-1/3 text-gray-700"
                          >
                            <Check className="text-green-500 mr-2" />
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {features.perks.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold mb-3">Perks</h3>
                      <ul>
                        {features.perks.map((i) => (
                          <li
                            key={i}
                            className="inline-flex items-center mb-2 w-1/2 lg:w-1/3 text-gray-700"
                          >
                            <Check className="text-green-500 mr-2" />
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {features.others.length > 0 && (
                    <div className="mt-4">
                      <h3 className="text-lg font-bold mb-3">Other Features</h3>
                      <ul>
                        {features.others.map((i) => (
                          <li
                            key={i}
                            className="inline-flex items-center mb-2 w-1/2 lg:w-1/3 text-gray-700"
                          >
                            <Check className="text-green-500 mr-2" />
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </section>
            {/* <BookViewingForm
              id={listing.source_ref || router.query.propertySlug}
              link={`${
                process.env.NEXT_PUBLIC_SITE_URL || SITE_URL
              }/properties/${listing.property_type}-for-${data.offer}-at-${
                kebabCase(listing.town_suburb) || kebabCase(listing.region)
              }-${router.query.propertySlug}`}
            /> */}
            {listing.offer === "sale" && (
              <MorgageCalculator homeValue={listing.sale_price || 0} />
            )}
          </div>
          <div className="w-full md:w-1/4">
            <div className="bg-charcoal p-4 mb-4 rounded-tr-3xl">
              <h4 className="text-gold uppercase text-xl mb-2">
                For {listing.offer}
              </h4>
              <span className="text-3xl text-white block">
                {listing.price_unit}{" "}
                {numberWithCommas((listing.offer === "sale" ? listing.sale_price : listing.rent_price) ?? "-")}
                {listing.offer !== "sale" && (
                  <small className="inline-block ml-2">
                    {listing.rent_term}
                  </small>
                )}
              </span>
              <button
                onClick={() => setFocusAgent(true)}
                className="group px-6 py-2.5 w-full bg-black/10 hover:bg-black/20 uppercase rounded-sm flex items-center mt-4 text-white"
              >
                <Mail className="mr-4" />
                <span>Enquire</span>
              </button>
              <button
                onClick={() => setFocusAgent(true)}
                className="group px-6 py-2.5 w-full bg-white uppercase rounded-sm flex items-center mt-2 text-black"
              >
                <Calendar className="mr-4" />
                <span>Book a Viewing</span>
              </button>
            </div>
            <AgentCard
              title={attributes.siteName}
              phone={`${attributes.phone} | ${attributes.phone2}`}
              teamID={listing.team}
              agentID={listing.listing_agent}
              focus={focusAgent}
              closeFocus={() => setFocusAgent(false)}
              listingRef={listing.source_ref || router.query.propertySlug}
            />
            <div className="mt-4">
              <h4 className="uppercase mb-3">Share this:</h4>
              <SocialShare
                description={listing?.description}
                title={listing.marketing_title || listingTitle}
                slug={`properties/${propertySlug(listing)}`}
              />
            </div>
          </div>
        </div>
      </section>
      <RelatedProperties
        listings={related}
        topLinks={topLinks}
      />
      <Footer />
    </>
  );
}

const DetailsCard = ({ title, value = "-" }) => (
  <div className="flex items-center justify-between py-2.5 border-t">
    <span>{title}:</span>
    <span>{value}</span>
  </div>
);

export async function getServerSideProps({ params }) {
  const id = params.propertySlug.split("-").pop();
  if (!/^\d+$/.test(id)) return { notFound: true };
  const listings = await getListings();
  const listing = listings.find((item) => String(item.id) === id);
  if (!listing) return { notFound: true };

  const related = listings.filter((item) =>
    item.id !== listing.id && item.property_type === listing.property_type && item.offer === listing.offer
  ).slice(0, 3);
  return { props: { data: listing, related } };
}
