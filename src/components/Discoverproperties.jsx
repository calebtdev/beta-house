import React, { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Discoverprop = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null); // ✅ define the ref here

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/properties?featured=true"
        );
        const data = await response.json();

        // if your API returns { properties: [...] }
        setProperties(data.properties || data);
      } catch (error) {
        console.error("Error fetching featured properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col gap-[2rem] items-center py-[5rem] px-12">
      <h1 className="font-bold text-[2rem]">Discover Our Popular Properties</h1>

      {loading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No featured properties available</p>
      ) : (
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-5 px-12 scroll-smooth no-scrollbar"
        >
          {properties.map((property, index) => (
            <div
              key={property._id || index}
              style={{ backgroundImage: `url(${property.image_url})` }}
              className="h-[20rem] w-[15rem] rounded-lg overflow-hidden bg-cover bg-center text-white flex items-end"
            >
              <div className="flex flex-col gap-2 bg-black/50 w-full py-3 px-2">
                <h1 className="text-[1rem]">{property.type}</h1>
                <h1 className="font-bold pt-2">₦{property.amount}</h1>
                <div className="text-[12px] flex flex-row">
                  <span className="pr-2">{property.rooms} Bed</span>
                  <span className="border-l border-r border-gray-400 px-2">
                    {property.bathrooms} Bath
                  </span>
                  <span className="px-2">{property.height} sq ft</span>
                </div>
                <div className="flex flex-row gap-1 items-center">
                  <FaMapMarkerAlt className="text-white " size={15} />
                  <span className="text-[13px]">{property.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Carousel Controls (static for now) */}
      <div className="absolute top-1/2 left-0 right-0 flex flex-row items-center justify-between gap-5 px-[12rem] -translate-y-1/2">
        <button
          className="w-12 h-12 flex bg-gray-200 items-center justify-center border rounded-full cursor-pointer"
          onClick={scrollLeft}
        >
          -
        </button>
        <button
          className="w-12 h-12 flex bg-gray-200 items-center justify-center border rounded-full cursor-pointer"
          onClick={scrollRight}
        >
          +
        </button>
      </div>
    </section>
  );
};

export default Discoverprop;
