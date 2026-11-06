import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/widgets/Breadcrumbs";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import EditListing from "../../../components/listings/EditListing";
import { useRouter } from "next/router";
import LoadingSpinner from "../../../components/widgets/LoadingSpinner";
import { API_ORIGIN, COMPANY_ID } from "../../../lib/listingConfig";

export default function ListingsPage() {
  const router = useRouter();

  return (
    <main className="bg-gray-200">
      <Nav />
      <Breadcrumbs
        title="Listings"
        breadcrumbs={[
          { title: "Home", link: "/" },
          { title: "Dashboard", link: "/dashboard" },
          { title: "Listings", link: "/dashboard/listings" },
        ]}
      />
      <div className="min-h-screen py-4 container">
        {router.query.listingID == "new" ? (
          <EditListing />
        ) : (
          <EditListingWrapper listingID={router.query.listingID} />
        )}
      </div>
      <Footer />
    </main>
  );
}

const EditListingWrapper = ({ listingID }) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    let active = true;
    async function fetchListing() {
      setLoading(true);
      try {
        // The editor needs the legacy editing fields that public v2 intentionally omits.
        const res = await fetch(`${API_ORIGIN}/api/v1/properties/${encodeURIComponent(listingID)}`);
        if (!res.ok) throw new Error("Listing unavailable");
        const record = await res.json();
        if (active) setData(record.company_id === COMPANY_ID ? record : null);
      } catch {
        if (active) setData(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    if (listingID) {
      fetchListing();
    }

    return () => { active = false; };
  }, [listingID]);

  if (loading) return <LoadingSpinner />;
  return data ? <EditListing listing={data} /> : <p>Could not load this listing.</p>;
};
