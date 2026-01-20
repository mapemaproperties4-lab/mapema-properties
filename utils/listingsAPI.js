import { data } from "autoprefixer";
import { API_ENDPOINT, NEXT_PUBLIC_TEAM_ID, SITE_URL } from "./constants";
import _, { includes, kebabCase } from "lodash";

export async function listingsAPI(req) {
  try {
    let listings = await getListings();

    let query = req.query || {};
    let listingCount;

    // filter by published
    if (query.published) {
      listings = listings.filter((i) => i.published);
    }

    // filter by offer
    if (query.offer) {
      listings = listings.filter((i) => i.offer === query.offer);
    }

    // filter by region
    if (query.region) {
      listings = listings.filter((i) =>
        includes(kebabCase(i.region), kebabCase(query.region))
      );
    }

    // filter by town
    if (query.town_suburb) {
      listings = listings.filter((i) =>
        includes(kebabCase(i.town_suburb), kebabCase(query.town_suburb))
      );
    }

    // filter by propertyType
    if (query.propertyType) {
      listings = listings.filter((i) => i.property_type === query.propertyType);
    }

    // filter by bedroom count
    if (query.bedroom_count) {
      listings = listings.filter((i) =>
        i.bedroom_count
          ? i.bedroom_count === parseInt(query.bedroom_count)
          : false
      );
    }

    // filter by bathroom count
    if (query.bathroom_count) {
      listings = listings.filter((i) =>
        i.bathroom_count
          ? i.bathroom_count >= parseInt(query.bathroom_count)
          : false
      );
    }

    // filter by furnished
    if (query.furnished) {
      listings = listings.filter((i) =>
        i.furnishing
          ? _.kebabCase(i.furnishing) === "furnished" ||
            _.kebabCase(i.furnishing) === "semi-furnished"
          : false
      );
    }

    // filter by features
    if (query.featured) {
      listings = listings.filter((i) => i.is_featured === true);
    }

    // filter by min price
    if (query.min_price) {
      listings = listings.filter((i) => {
        let price = i.offer === "sale" ? i.price : i.rent_price;

        let rst = price ? price >= parseInt(query.min_price) : false;

        return rst;
      });
    }

    // filter by max price
    if (query.max_price) {
      listings = listings.filter((i) => {
        let price = i.offer === "sale" ? i.price : i.rent_price;

        let rst = price ? price <= parseInt(query.max_price) : false;

        return rst;
      });
    }

    // search by location
    if (query.address) {
      listings = listings.filter((i) =>
        _.includes(
          `${i.region}${i.town_suburb || ""}${i.address || ""}${
            i.locality || ""
          }`
            .toLocaleLowerCase()
            .replaceAll(" ", ""),
          query.address.replaceAll(" ", "").toLowerCase()
        )
      );
    }

    // search by queryString
    if (query.searchString) {
      listings = listings.filter((i) =>
        _.includes(
          `${i.marketing_title || ""}${i.region}${i.town_suburb || ""}${
            i.address || ""
          }`
            .toLocaleLowerCase()
            .replaceAll(" ", ""),
          query.searchString.replace(" ", "").toLowerCase()
        )
      );
    }

    // pagination
    listingCount = listings.length;
    const itemsPerPage = 20;

    if (query.page) {
      const currentPage = parseInt(query.page);

      listings = listings.slice(
        currentPage * itemsPerPage - itemsPerPage,
        currentPage * itemsPerPage
      );
    }

    if (query.limit) {
      listings = listings.slice(0, parseInt(query.limit));
    }

    // return results
    return { listings: listings, totalCount: listingCount };
  } catch (error) {
    console.log(error);

    return { listings: [], totalCount: 0 };
  }
}

export async function getListingByID(listingID) {
  try {
    let listings = await getListings();

    let listing = _.find(listings, (l) => l.id.toString() === listingID);

    return { listing };
  } catch (error) {
    console.log(error);

    return { listing: {} };
  }
}

export async function getListings() {
  let listings = [];
  try {
    const res = await fetch(`${API_ENDPOINT}/properties/all?company_id=2`);
    const dataData = await res.json();

    if (dataData && dataData.length) {
      listings = dataData;
    }
  } catch (err) {
    console.log(err);
  }

  return listings;
}
