// Import React and necessary hooks
import React, { useEffect, useRef, useState } from "react";
// Import location icon
import { FaMapMarkerAlt } from "react-icons/fa";

const Discoverprop = () => {
  // State to store fetched properties
  const [properties, setProperties] = useState([]);
  // State to manage loading status
  const [loading, setLoading] = useState(true);
  // Ref for the scrollable container
  const scrollRef = useRef(null);

  // Fetch featured properties from backend API when component mounts
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(
          "https://beta-house-backend-xcox.onrender.com/api/v1/properties?featured=true"
        );
        const data = await res.json();

        // Handle both cases: API returns {properties: []} or just []
        setProperties(data.properties || data || []);
      } catch (e) {
        // Log any error that occurs during fetching
        console.error("Error fetching featured properties:", e);
      } finally {
        // Stop loading once request is complete
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  // Scroll left by 500px
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };

  // Scroll right by 500px
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 500, behavior: "smooth" });
    }
  };

  return (
    // Section wrapper
    <section className="relative flex flex-col gap-8 items-center py-20 px-12 overflow-hidden">
      {/* Heading */}
      <h1 className="font-bold text-2xl md:text-3xl">
        Discover Our Popular Properties
      </h1>

      {/* Conditional rendering: show loading, no properties, or properties */}
      {loading ? (
        <p>Loading...</p>
      ) : properties.length === 0 ? (
        <p>No featured properties available</p>
      ) : (
        <div className="relative w-full max-w-[1250px] mx-auto">
          {/* Scrollable container for property cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto gap-5 scroll-smooth no-scrollbar"
          >
            {/* Loop through properties and display each card */}
            {properties.map((property, index) => (
              <div
                key={property._id || index} // Use property id if available, else index
                className="flex-shrink-0 w-[300px] h-[300px] rounded-xl overflow-hidden bg-gray-200 relative"
              >
                {/* Background image */}
                <div
                  style={{
                    backgroundImage: `url(${property.image_url})`,
                  }}
                  className="absolute inset-0 bg-cover bg-center"
                />

                {/* Overlay with property details */}
                <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white p-3 space-y-2">
                  <h2 className="text-lg">{property.type}</h2>
                  <div className="font-bold">
                    ₦ {Number(property.amount).toLocaleString()}
                  </div>
                  <div className="text-sm flex gap-3">
                    <span>{property.rooms} Bed</span>
                    <span className="border-x border-white/40 px-3">
                      {property.bathrooms} Bath
                    </span>
                    <span>{property.height} sq ft</span>
                  </div>
                  {/* Location with icon */}
                  <div className="flex items-center gap-2 text-sm">
                    <FaMapMarkerAlt size={14} />
                    <span>{property.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll left arrow button */}
          <button
            type="button"
            onClick={scrollLeft}
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-0 z-10 w-10 h-10 rounded-full bg-gray-300 shadow-md flex items-center justify-center hover:bg-[#3D9970] hover:text-white"
          >
            &larr;
          </button>

          {/* Scroll right arrow button */}
          <button
            type="button"
            onClick={scrollRight}
            className="absolute top-1/2 -translate-y-1/2 translate-x-1/2 right-0 z-10 w-10 h-10 rounded-full bg-gray-300 shadow-md flex items-center justify-center hover:bg-[#3D9970] hover:text-white"
          >
            &rarr;
          </button>
        </div>
      )}
    </section>
  );
};

export default Discoverprop;
