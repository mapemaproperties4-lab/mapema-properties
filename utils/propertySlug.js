import { kebabCase } from "lodash";

export function propertySlug(listing) {
  return `${listing.property_type}-for-${listing.offer}-at-${kebabCase(listing.town_suburb || listing.region)}-${listing.id}`;
}
