import React, { useEffect, useRef, useState } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const Discoverprop = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          "https://beta-house-backend-xcox.onrender.com/api/v1/properties?featured=true"
        );
        const data = await res.json();
        setProperties(data.properties || data || []);
      } catch (e) {
        console.error("Error fetching featured properties:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    if (scrollRef.current)
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="relative flex flex-col gap-8 items-center py-20 px-4 sm:px-6 md:px-12 overflow-hidden">
      <h1 className="font-bold text-2xl sm:text-3xl text-center">
        Discover Our Popular Properties
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No featured properties available</p>
      ) : (
        <div className="relative w-full max-w-[1250px] mx-auto">
          {/* Scrollable container */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-4 sm:gap-5 scroll-smooth no-scrollbar"
          >
            {properties.map((property, index) => (
              <div
                key={property._id || index}
                className="flex-shrink-0 w-[80%] sm:w-[250px] md:w-[300px] h-[250px] sm:h-[280px] md:h-[300px] rounded-xl overflow-hidden bg-gray-200 relative"
              >
                <div
                  style={{ backgroundImage: `url(${property.image_url})` }}
                  className="absolute inset-0 bg-cover bg-center"
                />

                <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white p-3 space-y-1 sm:space-y-2">
                  <h2 className="text-base sm:text-lg font-semibold">
                    {property.type}
                  </h2>
                  <div className="font-bold text-sm sm:text-base">
                    ₦ {Number(property.amount).toLocaleString()}
                  </div>
                  <div className="text-xs sm:text-sm flex gap-2 sm:gap-3">
                    <span>{property.rooms} Bed</span>
                    <span className="border-x border-white/40 px-2">
                      {property.bathrooms} Bath
                    </span>
                    <span>{property.height} sq ft</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <FaMapMarkerAlt size={14} />
                    <span>{property.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Left arrow */}
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 -translate-y-1/2 left-0 z-10 w-10 h-10 rounded-full bg-gray-300 shadow-md flex items-center justify-center hover:bg-[#3D9970] hover:text-white cursor-pointer"
          >
            &larr;
          </button>

          {/* Right arrow */}
          <button
            onClick={scrollRight}
            className="absolute top-1/2 -translate-y-1/2 right-0 z-10 w-10 h-10 rounded-full bg-gray-300 shadow-md flex items-center justify-center hover:bg-[#3D9970] hover:text-white cursor-pointer"
          >
            &rarr;
          </button>
        </div>
      )}
    </section>
  );
};

export default Discoverprop;
