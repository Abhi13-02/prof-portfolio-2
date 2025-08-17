"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ChevronRight as ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useUser } from "../../../Provider";

const textAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const PhotoGalleryPage = () => {
  const { userData } = useUser();
  const photos = userData?.photos || [];
  const [currentIndex, setCurrentIndex] = useState(null);

  const openModal = (index) => setCurrentIndex(index);
  const closeModal = () => setCurrentIndex(null);
  const showPrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + photos.length - 1) % photos.length);
  };
  const showNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % photos.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-[#223843]">
      <main className="container mx-auto px-6 py-10 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-[#0284C7] transition-colors">
            Home
          </Link>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="hover:text-[#0284C7] transition-colors">Gallery</span>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-[#0284C7] font-medium">Photo Gallery</span>
        </nav>

        {/* Page Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textAnimation}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#064A6E] mb-2">Photo Gallery</h1>
          <div className="h-[3px] w-24 bg-[#0284C7] rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo._id || index}
              className="cursor-pointer rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              onClick={() => openModal(index)}
              initial="hidden"
              animate="visible"
              variants={textAnimation}
              transition={{ delay: index * 0.05 }}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title || `Photo ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
          {photos.length === 0 && (
            <p className="col-span-full text-center text-gray-600">No photos available.</p>
          )}
        </div>
      </main>

      {currentIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <button
            onClick={showPrev}
            className="absolute left-4 text-white p-2"
          >
            <ChevronLeft size={32} />
          </button>
          <img
            src={photos[currentIndex].imageUrl}
            alt={photos[currentIndex].title || ''}
            className="max-h-[80vh] object-contain rounded"
          />
          <button
            onClick={showNext}
            className="absolute right-4 text-white p-2"
          >
            <ChevronRight size={32} />
          </button>
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white p-2"
          >
            <X size={28} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 text-center">
            {photos[currentIndex].caption}
          </div>
          <div className="absolute bottom-0 left-0 right-0 pb-20 flex justify-center overflow-x-auto gap-2">
            {photos.map((p, idx) => (
              <img
                key={idx}
                src={p.imageUrl}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                }}
                className={`h-16 w-16 object-cover rounded cursor-pointer ${
                  idx === currentIndex ? 'ring-2 ring-white' : ''
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGalleryPage;

