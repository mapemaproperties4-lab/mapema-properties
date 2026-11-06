import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Breadcrumbs from "../../../components/widgets/Breadcrumbs";
import Nav from "../../../components/Nav";
import Footer from "../../../components/Footer";
import Link from "next/link";
import { Edit, Edit3, Trash } from "react-feather";
import LoadingSpinner from "../../../components/widgets/LoadingSpinner";

export default function ListingsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 10;

  // Set initial page from query param
  useEffect(() => {
    if (router.isReady) {
      const pageParam = parseInt(router.query.page, 10);
      if (!isNaN(pageParam) && pageParam > 0 && pageParam !== currentPage) {
        setCurrentPage(pageParam);
      }
    }
    // Only run if router.isReady or router.query.page changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query.page]);

  useEffect(() => {
    async function fetchListings() {
      setLoading(true);
      try {
        const res = await fetch("/api/get-listings");
        if (!res.ok) throw new Error("Listings unavailable");
        const { data } = await res.json();
        setListings(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchListings();
    return () => {};
  }, []);

  // Filter listings by search
  const filteredListings = listings.filter((i) =>
    i.marketing_title?.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);
  const paginatedListings = filteredListings.slice(
    (currentPage - 1) * listingsPerPage,
    currentPage * listingsPerPage
  );

  // Update page query param on page change
  useEffect(() => {
    if (router.isReady) {
      const currentQueryPage = parseInt(router.query.page, 10);
      // Only update if query param is missing or different and currentPage is not 1 due to default
      if (
        (isNaN(currentQueryPage) && currentPage !== 1) ||
        (currentPage !== (isNaN(currentQueryPage) ? 1 : currentQueryPage) &&
          currentPage > 0)
      ) {
        router.replace(
          {
            pathname: router.pathname,
            query: { ...router.query, page: currentPage },
          },
          undefined,
          { shallow: true }
        );
      }
    }
    // Only run if currentPage changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, router.isReady]);

  return (
    <main className="bg-gray-200">
      <Nav />
      <Breadcrumbs
        title="Listings"
        breadcrumbs={[
          { title: "Home", link: "/" },
          { title: "Dashboard", link: "/dashboard" },
        ]}
      />
      <div className="min-h-screen container w-full p-4">
        <div className="mb-4 w-full flex flex-col sm:flex-row justify-between items-center gap-2">
          <h1 className="uppercase">My Listings</h1>
          <div className="flex gap-2 items-center w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search listings..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border rounded w-full sm:w-[250px]"
            />
            <Link
              href="/dashboard/listings/new"
              className="px-5 py-2.5 rounded bg-primary text-white"
            >
              Add New
            </Link>
          </div>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div>
            {paginatedListings.map((i) => (
              <Link
                href={`/dashboard/listings/${i.id}`}
                className="p-4 rounded w-full bg-white mb-2 flex gap-4"
                key={i.id}
              >
                <img
                  src={
                    i.images && i.images.length > 0
                      ? i.images[0].url
                      : "/img/land.jpg"
                  }
                  alt=""
                  className="h-[120px] w-[120px] object-cover rounded"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <h3 className="mb-2 font-bold">{i.marketing_title}</h3>
                  <div className="flex gap-4 flex-wrap">
                    <span className="text-primary">ID: # {i.id}</span>
                    <span className="block mb-2">
                      {i.price_unit}{" "}
                      {i.offer === "sale"
                        ? (i.sale_price || 0).toLocaleString()
                        : (i.rent_price || 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="flex items-center p-2 px-6 rounded-full border gap-3">
                      <Edit3 />
                      <span className="text-sm">Edit</span>
                    </button>
                    <button className="hidden sm:flex items-center p-2 px-6 rounded-full border gap-3">
                      <Trash />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
            {!loading && paginatedListings.length === 0 && (
              <h3 className="text-3xl font-bold block my-[100px] text-center">
                {error ? "Could not load listings." : "No listings found."}
              </h3>
            )}
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  className="px-3 py-1 border border-gray-400 rounded disabled:opacity-50"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="px-3 py-1 border border-gray-400 rounded disabled:opacity-50"
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
