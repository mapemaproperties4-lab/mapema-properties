import React, { useRef, useState } from "react";
import { Image } from "react-feather";
import ImgsViewer from "react-images-viewer";

export default function PropertyGallery({
  images,
  altTitle,
  showSlider,
  setShowSlider,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) return <p>No photos available.</p>;

  const next = () => setCurrentIndex(currentIndex + 1);
  const previous = () => setCurrentIndex(currentIndex - 1);

  const updateCurrentSlide = (index) => {
    if (currentIndex !== index) {
      setCurrentIndex(index);
    }
  };

  return (
    <>
      <ImgsViewer
        imgs={images.map((i) => ({ src: i.url }))}
        currImg={currentIndex}
        isOpen={showSlider}
        onClickPrev={previous}
        onClickNext={next}
        onClose={() => setShowSlider(false)}
      />
      <section className="w-full mb-4 mt-2 grid md:grid-cols-4 gap-1 grid-rows-[200px_200px] lg:grid-rows-[220px_220px]">
        <div
          onClick={() => setShowSlider(true)}
          className="relative row-span-2 col-span-2"
          role="button"
        >
          <img
            className="w-full h-full object-cover cursor-pointer bg-slate-500"
            src={images[0].url}
            alt={altTitle}
          />
          <button className="absolute bottom-4 right-4 z-10 bg-gold hover:bg-gold/80 rounded-sm px-4 py-2 uppercase text-black flex items-center">
            <Image className="mr-2" />
            <span>View Images</span>
          </button>
        </div>
        <>
          {images.slice(1, 5).map((i) => (
            <div
              key={i.url}
              className="relative"
              onClick={() => setShowSlider(true)}
              role="button"
            >
              <img
                className="w-full h-full object-cover cursor-pointer bg-slate-500"
                src={i.url}
                alt={altTitle}
              />
              <button className="absolute bottom-2 right-2 z-10 bg-black/20 rounded-sm p-2 uppercase text-white flex items-center">
                <Image />
              </button>
            </div>
          ))}
        </>
      </section>
    </>
  );
}
