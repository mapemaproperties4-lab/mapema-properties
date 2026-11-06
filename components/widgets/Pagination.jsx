import Link from "next/link";
import React from "react";

export default function Pagination({
  postsPerPage,
  totalPosts,
  pathPrefix,
  query = {},
  currentPage,
}) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="py-2 mt-4">
      <div className="mb-3">
        <p className="text-sm text-gray-700">
          Showing
          <span className="font-medium">
            {" "}
            {totalPosts ? (currentPage - 1) * postsPerPage + 1 : 0}{" "}
          </span>
          to
          <span className="font-medium"> {Math.min(currentPage * postsPerPage, totalPosts)} </span>
          of
          <span className="font-medium"> {totalPosts} </span>
          results
        </p>
      </div>
      <nav className="block">
        <ul className="flex list-none flex-wrap">
          <li>
            {pageNumbers.map((number) => (
              <Link
                key={number}
                href={{ pathname: pathPrefix, query: { ...query, page: number } }}
                className={
                  currentPage === number
                    ? "bg-blue border-red-300 text-red-500 hover:bg-blue-200 relative inline-flex items-center shrink-0 px-5 py-4 border text-sm font-medium rounded-full mr-2 mb-2"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-blue-200 relative inline-flex shrink-0 items-center px-5 py-4 border text-sm font-medium rounded-full mr-2 mb-2"
                }
              >
                {number}
              </Link>
            ))}
          </li>
        </ul>
      </nav>
    </div>
  );
}
