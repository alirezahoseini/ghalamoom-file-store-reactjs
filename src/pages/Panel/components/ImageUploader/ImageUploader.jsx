import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB in bytes
const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
const API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;

const ImageUploader = ({ existingImage, onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (existingImage) {
      setPreview(existingImage);
    }
  }, [existingImage]);

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
    const file = e.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      uploadToCloudinary(file);
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file && validateFile(file)) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      uploadToCloudinary(file);
    }
  };

  const uploadToCloudinary = async (file) => {
    try {
      setLoading(true);
      setError(null);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET);
      formData.append('api_key', API_KEY);
      
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData
      );

      const imageUrl = response.data.secure_url;
      if (onImageUpload) {
        onImageUpload(imageUrl);
      }
      setLoading(false);
    } catch (err) {
      console.error('Upload error:', err);
      setError('خطا در آپلود تصویر');
      setLoading(false);
    }
  };

  const handleEdit = () => {
    fileInputRef.current.click();
  };

  return (
    <>
    <h2 className='text-sm mx-auto text-center my-2 text-slate-800
    dark:text-slate-300'>تصویر شاخص</h2>
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
      />
      
      {preview ? (
        <div className="relative">
          <img src={preview} alt="Preview" className="max-w-full h-auto rounded-lg mb-4" />
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
              <div className="text-white">در حال آپلود...</div>
            </div>
          )}
          <button
            onClick={handleEdit}
            className="absolute top-2 right-2 bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded text-sm shadow-sm transition-colors"
          >
            ویرایش
          </button>
        </div>
      ) : (
        <div 
          onClick={() => fileInputRef.current.click()}
          className="cursor-pointer py-6"
        >
          <p className="text-gray-500 mb-2">برای آپلود تصویر کلیک کنید یا فایل را اینجا رها کنید</p>
          <p className="text-xs text-gray-400">
            PNG, JPG, JPEG یا WEBP <br/>
             (حداکثر 1 مگابایت)
          </p>
        </div>
      )}

      {error && (
        <div className="text-red-500 mt-2">{error}</div>
      )}
    </div>
    </>
  );
};

export default ImageUploader;