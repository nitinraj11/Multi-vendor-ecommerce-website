import { useState, useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ProductCard from "./ProductCard";

const productsData = {
  best: [
    {
      name: "Drools Chicken and Egg Puppy Dog Dry Food",
      price: "1,800.00",
      discount: "-10%",
      image: "https://picsum.photos/300/300?random=71",
    },
    {
      name: "Henlo Chicken & Vegetable Dry Food for Adult",
      price: "2,179.00",
      discount: "-13%",
      image: "https://picsum.photos/300/300?random=72",
    },
    {
      name: "Pedigree Chicken and Liver Chunks in Gravy Adult Dog",
      price: "1,000.00",
      discount: "-50%",
      image: "https://picsum.photos/300/300?random=73",
    },
    {
      name: "Sheba Tuna Pumpkin & Carrot in Gravy",
      price: "1,670.00",
      discount: "-11%",
      image: "https://picsum.photos/300/300?random=74",
    },
    {
      name: "Royal Canin Adult Dog Food",
      price: "3,200.00",
      discount: "-15%",
      image: "https://picsum.photos/300/300?random=75",
    },
  ],

  dog: [
    {
      name: "Pedigree Pro Adult Large Breed",
      price: "2,950.00",
      discount: "-18%",
      image: "https://picsum.photos/300/300?random=76",
    },
    {
      name: "Royal Canin Maxi Adult Dog Food",
      price: "3,200.00",
      discount: "-15%",
      image: "https://picsum.photos/300/300?random=77",
    },
    {
      name: "Drools Focus Super Premium Adult",
      price: "2,850.00",
      discount: "-12%",
      image: "https://picsum.photos/300/300?random=78",
    },
    {
      name: "Royal Canin Adult Dog Food",
      price: "3,200.00",
      discount: "-15%",
      image: "https://picsum.photos/300/300?random=75",
    },
    {
      name: "Farmina N&D Ancestral Grain",
      price: "4,500.00",
      discount: "-20%",
      image: "https://picsum.photos/300/300?random=79",
    },
  ],

  cat: [
    {
      name: "Whiskas Adult Dry Cat Food Ocean Fish",
      price: "1,250.00",
      discount: "-20%",
      image: "https://picsum.photos/300/300?random=80",
    },
    {
      name: "Me-O Adult Persian Cat Food",
      price: "1,750.00",
      discount: "-14%",
      image: "https://picsum.photos/300/300?random=81",
    },
    {
      name: "Royal Canin Kitten Dry Food",
      price: "2,100.00",
      discount: "-10%",
      image: "https://picsum.photos/300/300?random=82",
    },
    {
      name: "Sheba Chicken Breast in Gravy",
      price: "1,480.00",
      discount: "-12%",
      image: "https://picsum.photos/300/300?random=83",
    },
  ],

  accessories: [
    {
      name: "Adjustable Dog Collar with Leash",
      price: "499.00",
      discount: "-25%",
      image: "https://picsum.photos/300/300?random=84",
    },
    {
      name: "Dog Feeding Bowl Stainless Steel",
      price: "299.00",
      discount: "-30%",
      image: "https://picsum.photos/300/300?random=85",
    },
    {
      name: "Chew Toy for Dogs (Rubber)",
      price: "349.00",
      discount: "-20%",
      image: "https://picsum.photos/300/300?random=86",
    },
    {
      name: "Pet Grooming Brush",
      price: "599.00",
      discount: "-18%",
      image: "https://picsum.photos/300/300?random=87",
    },
  ],
};

const tabs = [
  { key: "best", label: "Best Sellers" },
  { key: "dog", label: "Dog Food" },
  { key: "cat", label: "Cat Food" },
  { key: "accessories", label: "Dog Accessories" },
];

const CARD_WIDTH = 280;
const GAP = 24;
const VISIBLE_CARDS = 4;

const ProductsSection = () => {
  const [activeTab, setActiveTab] = useState("best");
  const [index, setIndex] = useState(0);

  const products = productsData[activeTab];
  const maxIndex = Math.max(0, products.length - VISIBLE_CARDS);

  const next = () =>
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const prev = () =>
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  // Reset slider on tab change
  useEffect(() => {
    setIndex(0);
  }, [activeTab]);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [maxIndex]);

  return (
    <section className="container mx-auto px-4 mt-14 relative">

      {/* TITLE */}
      <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
        Products
      </h2>

      {/* TABS */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition
              ${
                activeTab === tab.key
                  ? "bg-orange-500 text-white"
                  : "text-gray-600 hover:text-black"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* LEFT ARROW */}
      <button
        onClick={prev}
        className="absolute left-0 top-[55%] -translate-y-1/2 z-10
                   bg-white rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer"
      >
        <HiChevronLeft className="h-5 w-5" />
      </button>

      {/* SLIDER */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(-${index * (CARD_WIDTH + GAP)}px)`,
          }}
        >
          {products.map((product, i) => (
            <div key={i} style={{ minWidth: CARD_WIDTH }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT ARROW */}
      <button
        onClick={next}
        className="absolute right-0 top-[55%] -translate-y-1/2 z-10
                   bg-white rounded-full p-2 shadow hover:bg-gray-100 cursor-pointer"
      >
        <HiChevronRight className="h-5 w-5" />
      </button>
    </section>
  );
};

export default ProductsSection;