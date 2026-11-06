import ListingCard from "./ListingCard";
import PropertyLinks from "./PropertyLinks";

export default function RelatedProperties({ listings, topLinks }) {
  return (
    <section className="py-6 bg-gray-200">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-bold font-serif uppercase text-start mb-5">
          More Exclusive Properties
        </h2>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          {listings.map((i) => <ListingCard key={i.id} data={i} />)}
        </div>
        <PropertyLinks {...topLinks} />
      </div>
    </section>
  );
}
