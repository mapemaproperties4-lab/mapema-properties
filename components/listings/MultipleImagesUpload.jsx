import React, { useState } from "react";
import { Trash, Upload } from "react-feather";

const MultipleImagesUpload = ({ form, field }) => {
  const [images, setImages] = useState(field.value);
  const [loading, setLoading] = useState(false);
  const [imgError, setImgError] = useState(false);
  const maxUploads = 50;

  // Add watermark after resizing
  const resizeAndWatermarkImage = (file, maxWidth) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          let width = img.width;
          let height = img.height;

          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }

          canvas.width = width;
          canvas.height = height;

          // Draw the base image
          ctx.drawImage(img, 0, 0, width, height);

          // --- Add watermark text (bottom right) ---
          const watermarkText = "Mapema Properties"; // customize
          ctx.font = "20px Arial";
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)"; // semi-transparent white
          ctx.textAlign = "right";
          ctx.fillText(watermarkText, width - 10, height - 10);

          // --- Add watermark image (top left) ---
          const watermark = new Image();
          watermark.src = "/logo.png"; // path to your logo in public folder
          watermark.onload = () => {
            const w = 100; // logo width
            const h = (watermark.height / watermark.width) * w;
            ctx.save();
            ctx.globalAlpha = 0.7; // set opacity
            ctx.drawImage(watermark, 10, 10, w, h); // top left corner with 10px padding
            ctx.restore();
            canvas.toBlob((blob) => {
              resolve(blob);
            }, file.type);
          };
          watermark.onerror = () => {
            // fallback: just text watermark
            canvas.toBlob((blob) => {
              resolve(blob);
            }, file.type);
          };
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const selectFile = async (event) => {
    if (event.target.files.length < 1) {
      return;
    }

    if (images.length + event.target.files.length > maxUploads) {
      alert(`You can only upload up to ${maxUploads} images.`);
      return;
    }

    setLoading(true);

    const uploadPromises = Array.from(event.target.files).map(async (file) => {
      const resizedFile = await resizeAndWatermarkImage(file, 720);

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async () => {
          try {
            const cloudinaryResponse = await uploadToCloudinary(reader.result);

            resolve({
              public_id: cloudinaryResponse.public_id,
              url: cloudinaryResponse.url,
              secure_url: cloudinaryResponse.secure_url,
            });
          } catch (error) {
            reject(error);
          }
        };

        reader.readAsDataURL(resizedFile);
      });
    });

    try {
      const uploaded = await Promise.all(uploadPromises);

      setImages((prevImages) => [...prevImages, ...uploaded]);

      form.setFieldValue(field.name, [...field.value, ...uploaded]);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setImgError(true);
      setLoading(false);
    }
  };

  const uploadToCloudinary = async (base64Image) => {
    const cloudName = "duvicaxnf";
    const uploadPreset = "mapema-propertis";
    const formData = new FormData();

    formData.append("file", base64Image);
    formData.append("upload_preset", uploadPreset);

    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    const response = await fetch(apiUrl, {
      method: "POST",
      body: formData,
    });

    return response.json();
  };

  return (
    <div className="w-full grid gap-4 mt-2 mb-4">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 text-white">
          Uploading Images ...
        </div>
      )}

      <div
        className={`flex justify-center items-center border-2 border-gray-300 dark:border-dark-line border-dashed rounded-md h-48 overflow-y-hidden ${
          images.length > 0 ? "border-orange-500 dark:border-pink-500" : ""
        }`}
      >
        <label
          htmlFor="post_images"
          className="block space-y-1 text-center px-6 pt-5 pb-6 w-full"
        >
          <div className="mx-auto h-12 w-12 text-gray-400">
            <Upload />
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <div className="relative cursor-pointer bg-transparent rounded-md font-medium text-orange-500 dark:text-pink-500">
              <p className="text-gray-500 dark:text-white space-y-1 text-center">
                <span className="text-orange-500 dark:text-primary text-center block">
                  Upload Images
                </span>
                <span className="block text-xs text-gray-500">
                  PNG, JPG up to *MB
                </span>
              </p>
            </div>
          </div>
        </label>
        <input
          className="sr-only"
          id="post_images"
          name="post_images"
          type="file"
          accept="image/*"
          multiple
          onChange={selectFile}
        />
      </div>

      <div className="block" id="sh-images">
        {imgError && (
          <div className="p-4 bg-red-50 text-red-500 rounded">
            <p>Failed to upload all images, please try again</p>
          </div>
        )}
        {images.length > 0 &&
          images.map((image, index) => (
            <div
              key={index}
              className="image-item group relative h-[160px] inline-block w-[50%] md:w-[30%] p-1 object-cover rounded"
            >
              <div className="absolute top-3 right-3 tracking-wider">
                <button
                  onClick={() =>
                    setImages(images.filter((_, i) => i !== index))
                  }
                  className="h-8 w-8 rounded-full bg-white border flex items-center justify-center"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
              <img
                src={image.secure_url}
                alt=""
                className="w-full h-full object-cover rounded"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default MultipleImagesUpload;
