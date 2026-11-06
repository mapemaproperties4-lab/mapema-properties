import { snakeCase } from "lodash";

// Named searches published in the sitemap use the same filters as the search form.
const namedSearches = {
  land: { propertyType: "land_plot" },
  houses: { propertyType: "house" },
  apartments: { propertyType: "apartment" },
  "affordable-houses": { propertyType: "house", offer: "sale", sort: "price" },
  "affordable-apartments": { propertyType: "apartment", sort: "price" },
  "studio-apartments": { propertyType: "apartment", searchString: "studio" },
  "2-bedroom-apartments": { propertyType: "apartment", bedroom_count: 2 },
  shops: { propertyType: "commercial_property", searchString: "shop" },
  warehouses: { propertyType: "commercial_property", searchString: "warehouse" },
  "office-space": { propertyType: "office_space" },
  "commercial-land": { propertyType: "commercial_plot" },
  "investment-property": { propertyType: "properties", searchString: "investment" },
};

export default function getQueryFromUrl(slug) {
  const [category, location] = slug.split("-in-");
  const [type, offer] = category.split("-for-");
  const filters = Object.hasOwn(namedSearches, type) ? namedSearches[type] : {};
  return {
    propertyTypeQuery: filters.propertyType || snakeCase(type),
    offerQuery: offer || filters.offer || "NONE",
    locationQuery: location ? snakeCase(location) : "NONE",
    filters,
  };
}
