import React, { useState, useRef } from 'react';
import { serviceProviders } from "../constants"; // Assuming serviceProviders is in 'constants.js'
import { useTranslation } from 'react-i18next';
const ServiceProviders = () => {
  const [selectedService, setSelectedService] = useState("All");
  const [currentIndex, setCurrentIndex] = useState(0); // Index for slider
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const carouselRef = useRef(null);
  const { t } = useTranslation();
  // Handle mouse down (when user starts dragging)
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  // Handle mouse move (when user is dragging)
  const handleMouseMove = (e) => {
    if (!isDragging) return; // Only execute when dragging
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Multiply to increase scroll speed
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // Handle mouse up or leaving the carousel (stops dragging)
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Filter service providers based on the selected service
  const filteredProviders =
    selectedService === "All"
      ? serviceProviders
      : serviceProviders.filter(
        (provider) => provider.service === selectedService
      );

  // Limit the number of visible service providers to 4
  const visibleProviders = 4;
  const maxIndex = Math.max(0, filteredProviders.length - visibleProviders);

  // Handle previous/next button clicks
  const handleNext = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : maxIndex));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };
  const cardStyle = {
    color: 'var(--dark-color-two)',
    background: 'linear-gradient(135deg, #e0f7ff, #ffffff)',
  };
  return (
    <div className="w-full min-h-[120vh] flex flex-col justify-center items-center" style={cardStyle}>
      {/* Header Text */}
      <h1 className="btn-shine text-4xl font-bold text-center mb-8 text-[#001F3F] ">
        {t('Our Service Providers')}
      </h1>

      {/* Dropdown Menu for Filtering */}
      <div className="mb-8 text-center w-full max-w-lg">
        <select
          className="w-full px-5 py-3 text-lg bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 hover:shadow-lg transition-all duration-300 ease-in-out transform "
          value={selectedService}
          onChange={(e) => {
            setSelectedService(e.target.value);
            setCurrentIndex(0); // Reset to the first page of providers when filter changes
          }}
        >
          <option value="All">{t('All Services')}</option>
          <option value="Plumbing">{t('Plumbing')}</option>
          <option value="Carpentry">{t('Carpentry')}</option>
          <option value="Electrical Services">{t('Electrical Services')}</option>
          <option value="Landscaping">{t('Landscaping')}</option>
          <option value="Pest Control">{t('Pest Control')}</option>
          <option value="Appliance Repair">{t('Appliance Repair')}</option>
          <option value="AC Services">{t('AC Services')}</option>
          <option value="Roofing">{t('Roofing')}</option>

        </select>
      </div>

      {/* Slider Navigation Buttons */}
      {selectedService === "All" && (
        <div className="flex justify-between w-full max-w-4xl mb-4 px-4">
          {/* Previous Button */}
          <button
            className={`px-6 py-3 text-lg bg-gray-400 text-white rounded-full shadow-md focus:outline-none transform transition-all duration-300 ease-in-out hover:bg-gray-500 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${currentIndex === 0 ? "cursor-not-allowed" : ""
              }`}
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            <span className="inline-block transform rotate-180">&rarr;</span>
            Previous
          </button>

          {/* Next Button */}
          <button
            className={`px-6 py-3 text-lg bg-blue-500 text-white rounded-full shadow-md focus:outline-none transform transition-all duration-300 ease-in-out hover:bg-blue-600 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${currentIndex === maxIndex ? "cursor-not-allowed" : ""
              }`}
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
          >
            Next
            <span className="inline-block">&rarr;</span>
          </button>
        </div>
      )}

      {/* Carousel Container */}
      <div
        className={`w-full overflow-hidden cursor-${isDragging ? "grabbing" : "grab"
          }`}
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="flex transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleProviders)}%)`,
          }}
        >
          {filteredProviders.map((provider, index) => (
            <div
              key={index}
              className="min-w-[calc(90%/4)] mx-4 relative bg-white rounded-lg border border-gray-300 shadow-lg transition-all duration-300"
              style={{ height: '320px' }}
            >
              <img
                src={provider.image}
                alt={t(provider.providerName)}
                className="rounded-t-lg h-48 w-full object-fill"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-1 text-gray-800">
                  {t(provider.providerName)}
                </h2>
                <p className="text-gray-500 mb-3">{t(provider.service)}</p>
                <div className="flex items-center">
                  <span className="text-yellow-500 text-sm">
                    {"★".repeat(Math.floor(provider.rating))}
                  </span>
                  <span className="text-gray-300 text-sm">
                    {"★".repeat(5 - Math.floor(provider.rating))}
                  </span>
                  <span className="ml-2 text-gray-500 text-sm">
                    ({provider.rating})
                  </span>
                </div>
              </div>

              {/* Review section on hover */}
              <div
                className="absolute rounded-md inset-0 flex items-center justify-center bg-opacity-90 opacity-0 hover:opacity-100 transition-opacity duration-300 ease-in-out"
                style={{ background: 'rgba(0, 0, 0, 0.83)' }}
              >
                <p className="text-white px-6 py-4 text-center text-md">
                  {t(provider.review)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceProviders;
