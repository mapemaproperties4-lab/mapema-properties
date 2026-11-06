import { kebabCase } from "lodash";
import { getListings } from "../lib/publicListings";

const normalize = (value) => kebabCase(value).replaceAll("-", "");
const price = (listing) => listing.offer === "sale" ? listing.sale_price : listing.rent_price;
const matchesCount = (value, count) => count === "5" ? value >= 5 : value === Number(count);

export const PAGE_SIZE = 12;

export async function listingsAPI({ query = {} }) {
  const filters = Object.fromEntries(Object.entries(query).map(([key, value]) =>
    [key, Array.isArray(value) ? value[0] : value]
  ));
  let listings = (await getListings()).filter((item) => {
    if (filters.offer && item.offer !== filters.offer) return false;
    if (filters.region && !normalize(item.region).includes(normalize(filters.region))) return false;
    if (filters.town_suburb && !normalize(item.town_suburb).includes(normalize(filters.town_suburb))) return false;
    if (filters.propertyType && ![item.property_type, item.property_sub_type].includes(filters.propertyType)) return false;
    if (filters.bedroom_count && !matchesCount(item.bedroom_count, filters.bedroom_count)) return false;
    if (filters.bathroom_count && !matchesCount(item.bathroom_count, filters.bathroom_count)) return false;
    if (filters.featured && !item.is_featured) return false;
    if (filters.furnished) {
      const furnishing = kebabCase(item.furnishing);
      const matches = filters.furnished === "true" ? ["furnished", "semi-furnished"].includes(furnishing)
        : furnishing === (filters.furnished === "false" ? "unfurnished" : filters.furnished);
      if (!matches) return false;
    }
    if (filters.min_price && (price(item) == null || price(item) < Number(filters.min_price))) return false;
    if (filters.max_price && (price(item) == null || price(item) > Number(filters.max_price))) return false;
    const location = [item.region, item.town_suburb, item.locality, item.address].join(" ");
    if (filters.address && !normalize(location).includes(normalize(filters.address))) return false;
    if (filters.searchString && !normalize([item.marketing_title, location, item.property_sub_type].join(" ")).includes(normalize(filters.searchString))) return false;
    return true;
  });

  if (filters.sort === "price") {
    listings.sort((a, b) => (price(a) ?? Infinity) - (price(b) ?? Infinity));
  }
  const totalCount = listings.length;
  if (filters.page) {
    const start = (Math.max(1, parseInt(filters.page, 10) || 1) - 1) * PAGE_SIZE;
    listings = listings.slice(start, start + PAGE_SIZE);
  }
  if (filters.limit) listings = listings.slice(0, Number(filters.limit));
  return { listings, totalCount };
}
