/* eslint-disable @next/next/no-img-element */
import { kebabCase, truncate, upperFirst } from "lodash";
import Link from "next/link";
import React from "react";
import { Image } from "react-feather";
import WhatsAppIcon from "./widgets/WhatsAppIcon";
import { attributes as settings } from "../content/settings.md";
import { SITE_URL } from "../utils/constants";
import { formatDistance } from "date-fns";

const ListingCard = ({ data }) => {
  const featuredImg =
    data.images && data.images.length > 0 ? data.images[0] : "";
  const price = data.offer === "rent" ? data.rent_price : data.sale_price;
  let sizeToDisplay = data.size
    ? data.size + " " + data.size_unit
    : data.floor_size
    ? data.floor_size + " " + data.floor_sizeunit
    : "";
  let location = data.address || data.town_suburb || data.city_region;
  let excerpt = truncate(data.description, { length: 150 });
  let title = `${upperFirst(data.property_type)} for ${
    data.offer
  } at ${location}`;
  let slug = `/properties/${data.property_type}-for-${data.offer}-at-${
    kebabCase(data.town_suburb) || kebabCase(data.city_region)
  }-${data.id}`;

  return (
    <section className="w-full group relative group border rounded">
      <div className="absolute top-0 right-0 w-[150px] h-[150px] overflow-hidden uppercase z-30">
        {data.status === "sold" || data.status === "rented" ? (
          <span className="-left-[25px] top-[30px] rotate-45 block w-[260px] p-[6px_0] text-white text-center bg-red-600 absolute">
            {data.offer === "rent" ? "Rented" : "Sold"}
          </span>
        ) : (
          <span className="-left-[25px] top-[30px] rotate-45 block w-[260px] p-[6px_0] text-black text-center bg-gold absolute">
            {data.offer === "rent" ? "For Rent" : "For Sale"}
          </span>
        )}
      </div>
      <Link href={slug}>
        <div className="w-full h-[320px] overflow-hidden">
          <img
            src={featuredImg.secure_url}
            alt={title}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-110 duration-500 rounded rounded-tr-3xl"
          />
        </div>
      </Link>
      <div className="absolute top-[280px] right-3 z-10 flex gap-2">
        <div className=" bg-gray-600/50 rounded-sm p-1 uppercase text-white flex items-center">
          <Image className="h-4 mr-1" />
          <span className="mr-1">{(data.images || []).length}</span>
        </div>
        <div className=" bg-gray-600/50 rounded-sm p-1 px-2 uppercase text-white flex items-center">
          <span>{data.property_type}</span>
        </div>
      </div>
      <div className="absolute top-[284px] left-3 rounded-sm p-1 px-2 text-sm capitalize bg-black/30 text-white">
        {formatDistance(new Date(data.created_at), new Date(), {
          addSuffix: true,
        })}
      </div>
      <div className=" inset-0 flex items-end">
        <div className="bg-white block rounded-b p-5 w-full group-hover:h-full transition-all duration-300">
          <Link href={slug}>
            <h2 className="text-2xl mb-4 font-bold">
              {data.marketing_title || title}
            </h2>
            <span className="text-lg font-semibold">
              {data.price_unit} {price ? price.toLocaleString() : "0"}
            </span>
            <span className="text-sm uppercase block mt-2 text-slate-600">
              {location}
            </span>
            <div className="flex flex-wrap justify-between items-center mt-3">
              <div className="flex items-center mr-1">
                <img
                  src="/img/bedroom.png"
                  alt="bedrooms"
                  className="h-7 w-auto mr-2"
                />
                <span className="text-base">{data.bedroom_count || "-"}</span>
              </div>
              <div className="flex items-center mr-1">
                <img
                  src="/img/bathtub.png"
                  alt="bathrooms"
                  className="h-6 w-auto mr-2"
                />
                <span className="text-base">{data.bathroom_count || "-"}</span>
              </div>
              <div className="flex items-center mr-1">
                <img
                  src="/img/size.png"
                  alt="size"
                  className="h-6 w-auto mr-2"
                />
                <span className="text-base">{sizeToDisplay || "-"}</span>
              </div>
            </div>
          </Link>
          <div className="block">
            <Link href={slug}>
              <h2 className="font-bold text-lg mb-2 mt-6 hidden">{title}</h2>
              <p className="text-gray-800 hidden">{excerpt}</p>
            </Link>
            <div className="flex gap-4">
              <Link
                href={slug}
                className="px-6 py-2.5 text-sm uppercase rounded text-center inline-block mt-6 bg-accent text-secondary rounded-tr-xl"
              >
                Details
              </Link>
              <a
                href={`https://wa.me/${settings.phone}?text=I am interested in your property listing: ${title} - ${SITE_URL}${slug}`}
                className="px-6 py-2.5 text-sm uppercase rounded text-center inline-flex items-center gap-2 mt-6 bg-primary text-white rounded-tr-xl"
              >
                <WhatsAppIcon className="h-4 w-auto fill-white" />
                Enquire
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ListingCard;
