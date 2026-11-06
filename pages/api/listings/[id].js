import { getListings } from "../../../lib/publicListings";
import { API_ENDPOINT } from "../../../utils/constants";

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id)
    return res.status(400).json({ error: "BAD_REQUEST", status: "ERROR" });

  //   GET
  if (req.method === "GET") {
    try {
      const listing = (await getListings()).find((item) => String(item.id) === id);
      if (!listing) return res.status(404).json({ success: false });
      return res.status(200).json({ success: true, data: listing });
    } catch (error) {
      console.error("Could not load listing", error);
      return res.status(502).json({ success: false });
    }
  }

  //   POST
  if (req.method === "POST") {
    const { data } = req.body;

    if (!data)
      return res.status(400).json({ error: "BAD_REQUEST", status: "ERROR" });

    try {
      // Update the survey data
      const apiRes = await fetch(`${API_ENDPOINT}/properties/${id}`, {
        body: JSON.stringify({
          ...data,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
      });

      const d = await apiRes.json();
      console.log(d.message);
    } catch (error) {
      console.error("Failed to update data", error);

      return res.status(500).json({
        success: false,
        message: "Failed to update data in redis",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data updated successfully",
    });
  }

  //   DELETE
  if (req.method === "DELETE") {
    try {
      // Delete the survey data
      await fetch(`${API_ENDPOINT}/properties/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });
    } catch (error) {
      console.error("Failed to delete data", error);

      return res.status(500).json({
        success: false,
        message: "Failed to delete data from redis",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data deleted successfully",
    });
  }
}
