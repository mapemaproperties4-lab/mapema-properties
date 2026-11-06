import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { ChevronDown, RotateCcw } from "react-feather";
import { objectToGetParams } from "../utils/objectToGetParams";
import { propertyTypes } from "./constants";
import { attributes as locationData } from "../content/locations.md";
import {
  getAllCountries,
  getAreas,
  getSubCounties,
} from "../lib/getLocationOptions";

export default function SearchForm() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className=" py-4 text-white">
      <div className="container max-w-6xl">
        <Formik
          initialValues={{
            searchString: "",
            region: "",
            town_suburb: "",
            address: "",
          }}
          enableReinitialize
          onSubmit={async (values) => {
            console.log(values);
            let searchKeys = {};
            Object.keys(values).forEach((i) => {
              if (values[i] !== "") searchKeys[i] = values[i];
            });

            router.push(`/property-search?${objectToGetParams(searchKeys)}`);
          }}
        >
          {({
            isSubmitting,
            dirty,
            setFieldValue,
            values,
            errors,
            resetForm,
          }) => (
            <Form className="text-black/80 grid grid-cols-2 md:grid-cols-4 gap-2">
              <Field
                type="text"
                className="
                    col-span-2
                    block
                    w-full
                    bg-gray-100
                    rounded-t-lg
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0
                    md:col-span-4
                  "
                name="searchString"
                placeholder="Search property name or location..."
              />
              <Field
                className="
                    block
                    w-full
                    
                    bg-gray-100
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0
                  
                  "
                name="region"
                as="select"
                placeholder="Property Region"
              >
                <option value="">Choose Region</option>
                {getAllCountries().map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Field>
              <Field
                className="
                    block
                    w-full
                    
                    bg-gray-100
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0
                  
                  "
                name="town_suburb"
                as="select"
                placeholder="Property Town"
              >
                <option value="">Choose Town</option>
                {(values.region ? getSubCounties(values.region) : []).map(
                  (o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  )
                )}
              </Field>
              <Field
                className="
                    block
                    w-full
                    
                    bg-gray-100
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0
                  
                  "
                name="address"
                as="select"
                placeholder="Property Locality"
              >
                <option value="">Choose Locality</option>
                {(values.town_suburb
                  ? getAreas(values.region, values.town_suburb)
                  : []
                ).map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </Field>
              <Field
                className="
                    block
                    w-full
                    
                    bg-gray-100
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0
                  
                  "
                name="propertyType"
                as="select"
                placeholder="Property Type"
              >
                <option value="">Property Type</option>
                {propertyTypes.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.title}
                  </option>
                ))}
              </Field>
              <Field
                className="
                    block
                    w-full                 
                    bg-gray-100
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0                 
                  "
                name="offer"
                as="select"
                placeholder="Buy or Rent"
              >
                <option value="">Buy or Rent</option>
                {[
                  { title: "Buy", value: "sale" },
                  { title: "Rent", value: "rent" },
                ].map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.title}
                  </option>
                ))}
              </Field>
              <Field
                className="
                    block
                    w-full                    
                    bg-gray-100
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0                  
                  "
                name="bedroom_count"
                as="select"
                placeholder="Bedrooms"
              >
                <option value="">Bedrooms</option>
                {[1, 2, 3, 4].map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
                <option value={5}>5+</option>
              </Field>
              <Field
                className="
                    block
                    w-full                    
                    bg-gray-100
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0                  
                  "
                name="bathroom_count"
                as="select"
                placeholder="Bathrooms"
              >
                <option value="">Bathrooms</option>
                {[1, 2, 3, 4].map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
                <option value={5}>5+</option>
              </Field>
              <Field
                type="number"
                className="
                    block
                    w-full
                    bg-gray-100
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0
                  "
                name="max_price"
                placeholder="Max Price"
              />

              <div
                className={`overflow-hidden grid col-span-2 md:grid-cols-4 md:col-span-4 transition-all duration-300 gap-2 ${
                  showMore ? "max-h-[1000px]" : "max-h-0"
                }`}
              >
                <Field
                  type="number"
                  className="
                    block
                    w-full
                    bg-gray-100
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0
                  "
                  name="min_price"
                  placeholder="Min Price"
                />

                <Field
                  className="
                    block
                    w-full                 
                    bg-gray-100
                    border-transparent
                    focus:border-primary focus:bg-white focus:ring-0                 
                  "
                  name="furnished"
                  as="select"
                  placeholder="Furnishing"
                >
                  <option value="">Furnishing</option>
                  {[
                    { title: "Fully Furnished", value: "furnished" },
                    { title: "Semi-Furnished", value: "semi-furnished" },
                    { title: "Not Furnished", value: "unfurnished" },
                  ].map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.title}
                    </option>
                  ))}
                </Field>
              </div>

              <button
                type="submit"
                className="px-6 col-span-2 md:col-span-4 py-3 w-full text-center block rounded-b-lg bg-gold hover:bg-gold/90 text-primary"
              >
                Search{" "}
              </button>
              <div className="flex gap-4 flex-wrap col-span-2">
                <button
                  onClick={() => setShowMore(!showMore)}
                  type="button"
                  className="gap-2 text-gold text-sm font-bold uppercase flex items-center justify-between"
                >
                  <span>{showMore ? "Less Filters" : "More Filters"}</span>
                  <ChevronDown
                    className={`h-5 ${showMore && "rotate-180"} transition-all`}
                  />
                </button>
                <button
                  onClick={() => resetForm()}
                  type="button"
                  className="gap-2 group text-gold text-sm font-bold uppercase flex items-center justify-between"
                >
                  <span>Reset Form</span>
                  <RotateCcw
                    className={`h-4 w-auto group-hover:-rotate-180 transition-all`}
                  />
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
