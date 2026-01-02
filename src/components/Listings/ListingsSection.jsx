import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ListingCard from "./ListingCard";
import listings from "../../data/listings";

const tabs = [
  { key: "featured", label: "Featured Listings" },
  { key: "cow", label: "Cow" },
  { key: "buffalo", label: "Buffalo" },
  { key: "goat", label: "Goat" },
  { key: "sheep", label: "Sheep" },
];

const CARD_WIDTH = 280;
const GAP = 24;
const VISIBLE_CARDS = 3;

const ListingsSection = () => {
  const [activeTab, setActiveTab] = useState("featured");
  const [index, setIndex] = useState(0);

  const filteredListings =
    activeTab === "featured"
      ? listings.filter((l) => l.category === "featured")
      : listings.filter((l) => l.type === activeTab);

  const maxIndex = Math.max(0, filteredListings.length - VISIBLE_CARDS);

  const next = () => setIndex((p) => (p >= maxIndex ? 0 : p + 1));
  const prev = () => setIndex((p) => (p <= 0 ? maxIndex : p - 1));

  useEffect(() => setIndex(0), [activeTab]);

  return (
    <section className="container mx-auto px-4 mt-20 relative">
      <h2 className="text-2xl font-semibold mb-6 text-center">Listings</h2>

      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-6 py-2 rounded-md ${
              activeTab === tab.key
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <button onClick={prev} className="absolute left-0 top-[60%] z-10">
        <HiChevronLeft />
      </button>

      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700"
          style={{
            gap: GAP,
            transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
          }}
        >
          {filteredListings.map((listing) => (
            <div key={listing.id} style={{ minWidth: CARD_WIDTH }}>
              <ListingCard listing={listing} />
            </div>
          ))}
        </div>
      </div>

      <button onClick={next} className="absolute right-0 top-[60%] z-10">
        <HiChevronRight />
      </button>
    </section>
  );
};

export default ListingsSection;
