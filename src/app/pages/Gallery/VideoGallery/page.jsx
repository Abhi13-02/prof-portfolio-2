"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight as ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { useUser } from "../../../Provider";

const textAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const VideoGalleryPage = () => {
  const { userData } = useUser();
  const videos = userData?.videos || [];
  const [visible, setVisible] = useState(6);

  const loadMore = () => setVisible((v) => v + 6);

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
          <span className="text-[#0284C7] font-medium">Video Gallery</span>
        </nav>

        {/* Page Title */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textAnimation}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-[#064A6E] mb-2">Video Gallery</h1>
          <div className="h-[3px] w-24 bg-[#0284C7] rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.slice(0, visible).map((video, index) => (
            <motion.div
              key={video._id || index}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              initial="hidden"
              animate="visible"
              variants={textAnimation}
              transition={{ delay: index * 0.05 }}
            >
              {video.youtubeUrl ? (
                <div className="aspect-video">
                  <iframe
                    src={video.youtubeUrl.replace('watch?v=', 'embed/')}
                    className="w-full h-full"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <div className="aspect-video">
                  <video src={video.videoUrl} controls className="w-full h-full" />
                </div>
              )}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-[#064A6E] mb-2">
                  {video.title}
                </h3>
                {video.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {video.description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
          {videos.length === 0 && (
            <p className="col-span-full text-center text-gray-600">No videos available.</p>
          )}
        </div>

        {visible < videos.length && (
          <div className="flex justify-center mt-6">
            <button onClick={loadMore} className="btn btn-primary">
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default VideoGalleryPage;

