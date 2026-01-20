import React, { useState } from "react";
import { useRouter } from "next/router";
import updateListing from "../../utils/updateListing";
import {
  ArrowUp,
  ArrowUpCircle,
  CheckCircle,
  CornerUpLeft,
  Power,
  RotateCcw,
  XCircle,
} from "react-feather";

export default function BoostOptions({ listing }) {
  const [modal, setModal] = useState(null);
  const router = useRouter();

  async function handleBoost(action) {
    let dataToSave = {};
    switch (action) {
      case "top":
        dataToSave = { is_featured: listing.is_featured ? false : true, created_at: new Date().toISOString() };
        break;
      case "sold":
        dataToSave = {
          status:
            listing.status === "sold" || listing.status === "rented"
              ? "active"
              : listing.offer === "rent"
              ? "rented"
              : "sold",
        };
        break;
      case "renew":
        dataToSave = { created_at: new Date().toISOString() };
        break;
      case "unpublish":
        dataToSave = { published: listing.published ? false : true };
        break;
      default:
        return;
    }
    const result = await updateListing(dataToSave, listing.id);
    if (result === "SUCCESS") {
      setModal({ type: "success", message: "Listing updated successfully." });
    } else {
      setModal({ type: "error", message: "Failed to update listing." });
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <button
          className="p-4 rounded bg-gray-200 flex items-center flex-col gap-4"
          onClick={() => handleBoost("top")}
        >
          <ArrowUpCircle className="h-6 w-6" />
          <span>Move to top</span>
        </button>
        <button
          className="p-4 rounded bg-gray-200 flex items-center flex-col gap-4"
          onClick={() => handleBoost("sold")}
        >
          <CheckCircle className="h-6 w-6" />
          <span>
            {listing.status === "sold" || listing.status === "rented"
              ? "Mark as available"
              : "Mark as sold/rented"}
          </span>
        </button>
        <button
          className="p-4 rounded bg-gray-200 flex items-center flex-col gap-4"
          onClick={() => handleBoost("renew")}
        >
          <RotateCcw className="h-6 w-6" />
          <span>Renew</span>
        </button>
        <button
          className={`p-4 rounded flex items-center flex-col gap-4 text-white ${
            listing.published ? "bg-red-500" : "bg-green-500"
          }`}
          onClick={() => handleBoost("unpublish")}
        >
          <Power className="h-6 w-6" />
          <span>{listing.published ? "Unpublish" : "Publish"}</span>
        </button>
      </div>
      {modal && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50`}
        >
          <div className="bg-white p-10 rounded-xl shadow-2xl min-w-[400px] max-w-[90vw] text-center">
            <div className="flex flex-col items-center justify-center mb-6">
              {modal.type === "success" ? (
                <CheckCircle className="h-16 w-16 text-green-500 mb-2" />
              ) : (
                <XCircle className="h-16 w-16 text-red-500 mb-2" />
              )}
              <div
                className={`text-2xl font-bold ${
                  modal.type === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {modal.type === "success" ? "Success" : "Error"}
              </div>
            </div>
            <div className="mb-8 text-lg">{modal.message}</div>
            <button
              className="px-6 py-3 bg-primary text-white rounded text-lg font-semibold"
              onClick={() => {
                setModal(null);
                router.reload();
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}
