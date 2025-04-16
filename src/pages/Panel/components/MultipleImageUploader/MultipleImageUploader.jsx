import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_IMAGES = 5;
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;

const MultipleImageUploader = ({ existingImages = [], onImagesUpload }) => {
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (existingImages && existingImages.length > 0) {
      setPreviews(existingImages);
      setImages(existingImages);
    }
  }, [existingImages]);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('فقط فرمت‌های PNG, JPG, JPEG و WEBP مجاز هستند');
      return false;
    }
    
    if (file.size > MAX_FILE_SIZE) {
      setError('حجم فایل باید کمتر از 1 مگابایت باشد');
      return false;
    }

    return true;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const files = Array.from(e.dataTransfer.files);
    
    if (previews.length + files.length > MAX_IMAGES) {
      setError(`حداکثر ${MAX_IMAGES} تصویر می‌توانید آپلود کنید`);
      return;
    }

    const validFiles = files.filter(validateFile);
    if (validFiles.length > 0) {
      uploadFiles(validFiles);
    }
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    
    if (previews.length + files.length > MAX_IMAGES) {
      setError(`حداکثر ${MAX_IMAGES} تصویر می‌توانید آپلود کنید`);
      return;
    }

    const validFiles = files.filter(validateFile);
    if (validFiles.length > 0) {
      uploadFiles(validFiles);
    }
  };

  const uploadToCloudinary = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('api_key', API_KEY);
      
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );
      
      setLoading(false);
      return response.data.secure_url;
    } catch (error) {
      console.error('Upload error:', error);
      setError('خطا در آپلود تصویر');
      setLoading(false);
      return null;
    }
  };

  const uploadFiles = async (files) => {
    setLoading(true);
    setError(null);

    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file));

      const newUrls = (await Promise.all(uploadPromises)).filter(url => url !== null);
      
      // Check for duplicates
      const uniqueUrls = newUrls.filter(url => !images.includes(url));
      
      if (uniqueUrls.length > 0) {
        const updatedImages = [...images, ...uniqueUrls];
        const updatedPreviews = [...previews, ...uniqueUrls];
        
        setImages(updatedImages);
        setPreviews(updatedPreviews);
        
        if (onImagesUpload) {
          onImagesUpload(updatedImages);
        }
      }
    } catch (err) {
      console.error('Upload error:', err);
      setError('خطا در آپلود تصویر');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    const updatedPreviews = previews.filter((_, index) => index !== indexToRemove);
    
    setImages(updatedImages);
    setPreviews(updatedPreviews);
    
    if (onImagesUpload) {
      onImagesUpload(updatedImages);
    }
  };

  return (
 <>
    <h2 className='text-sm mx-auto text-center mt-4 mb-2 text-slate-
    dark:text-slate-300'> گالری تصاویر </h2>
    <div className="w-full max-w-md mx-auto">
      <div 
        className="w-[80%] max-w-md mx-auto p-4 border-2 border-dashed 
      border-gray-300 dark:border-slate-600 rounded-2xl text-center relative"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          accept=".jpg,.jpeg,.png,.webp"
          className="hidden"
          multiple
        />
        
        <div 
          onClick={() => fileInputRef.current.click()}
          className="cursor-pointer py-8"
        >
          <p className="text-gray-500 mb-2">برای آپلود تصویر کلیک کنید یا فایل را اینجا رها کنید</p>
          <p className="text-xs text-gray-400">
            PNG, JPG, JPEG یا WEBP <br/>
             (حداکثر 1 مگابایت)
          </p>
          <p className="text-xs text-gray-400 mt-1">حداکثر {MAX_IMAGES} تصویر</p>
        </div>

        {loading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
            <div className="text-white">در حال آپلود...</div>
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-500 mt-2 text-center">{error}</div>
      )}

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 px-3">
          {previews.map((preview, index) => (
            <div key={index} className="relative group">
              <img 
                src={preview} 
                alt={`تصویر ${index + 1}`} 
                className="w-full h-40 object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white pt-[2px]
                rounded-full opacity-100 transition-opacity w-6 h-6 flex items-center justify-center"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
 </>
  );
};

export default MultipleImageUploader;