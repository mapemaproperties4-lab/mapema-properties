import { getListings } from "../../lib/publicListings";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).setHeader("Allow", "GET").end();
  try {
    const listings = await getListings();
    const limit = Number(req.query.limit);
    const data = Number.isInteger(limit) && limit > 0 ? listings.slice(0, limit) : listings;
    return res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Could not load listings", error);
    return res.status(502).json({ success: false, message: "Listings are temporarily unavailable." });
  }
}
