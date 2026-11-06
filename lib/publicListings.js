// The public API only returns published inventory for this company.
const { API_ORIGIN, COMPANY_ID } = require("./listingConfig");
const propertiesUrl = `${API_ORIGIN}/api/v2/public/companies/${COMPANY_ID}/properties`;

async function fetchListings() {
  const listings = [];
  let url = `${propertiesUrl}?per_page=100`;
  while (url) {
    const response = await fetch(url, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`Listings API returned ${response.status}`);
    const { data, links } = await response.json();
    listings.push(...data.map((listing) => ({
      ...listing,
      sale_price: listing.sale_price == null ? null : Number(listing.sale_price),
      rent_price: listing.rent_price == null ? null : Number(listing.rent_price),
    })));
    url = links.next;
  }
  // The feed is ordered by ascending ID; the site shows newest listings first.
  return listings.reverse();
}

// Share a refresh between concurrent page requests and respect the upstream rate limit.
let cached, expiresAt, pending;
async function getListings() {
  if (cached && Date.now() < expiresAt) return cached;
  if (!pending) {
    pending = fetchListings().then((listings) => {
      cached = listings;
      expiresAt = Date.now() + 60_000;
      return cached;
    }).finally(() => { pending = null; });
  }
  return pending;
}

module.exports = { getListings };
