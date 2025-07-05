"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { supabase } from "@/src/lib/supabase"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  images: string[]
  onImagesChange: (images: string[]) => void
  maxImages?: number
  className?: string
}

export default function ImageUpload({ 
  images, 
  onImagesChange, 
  maxImages = 10,
  className = "" 
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (images.length + acceptedFiles.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`)
      return
    }

    setUploading(true)
    const newImages = [...images]
    const uploadPromises = acceptedFiles.map(async (file) => {
      try {
        // Generate unique filename
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
        const filePath = `events/${fileName}`

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('events')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          })

        if (error) {
          console.error('Upload error:', error)
          throw error
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('events')
          .getPublicUrl(filePath)

        return publicUrl
      } catch (error) {
        console.error('Error uploading file:', error)
        throw error
      }
    })

    try {
      const uploadedUrls = await Promise.all(uploadPromises)
      onImagesChange([...newImages, ...uploadedUrls])
    } catch (error) {
      alert('Failed to upload some images. Please try again.')
    } finally {
      setUploading(false)
      setUploadProgress({})
    }
  }, [images, onImagesChange, maxImages])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    disabled: uploading
  })

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onImagesChange(newImages)
  }

  const removeImageFromStorage = async (imageUrl: string) => {
    try {
      // Extract file path from URL
      const urlParts = imageUrl.split('/')
      const fileName = urlParts[urlParts.length - 1]
      const filePath = `events/${fileName}`

      const { error } = await supabase.storage
        .from('events')
        .remove([filePath])

      if (error) {
        console.error('Error removing file:', error)
      }
    } catch (error) {
      console.error('Error removing file:', error)
    }
  }

  const handleRemoveImage = async (index: number) => {
    const imageUrl = images[index]
    await removeImageFromStorage(imageUrl)
    removeImage(index)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Images ({images.length}/{maxImages})
        </label>
        
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragActive 
              ? 'border-[#B8860B] bg-[#B8860B]/10' 
              : 'border-gray-300 hover:border-[#B8860B] hover:bg-gray-50'
            }
            ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center">
            {uploading ? (
              <>
                <Loader2 className="w-8 h-8 text-[#B8860B] animate-spin mb-2" />
                <p className="text-sm text-gray-600">Uploading images...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  {isDragActive 
                    ? "Drop the images here..." 
                    : "Drag & drop images here, or click to select files"
                  }
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF, WEBP up to 5MB each
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={imageUrl}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Cover Image Selection */}
      {images.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image (first image will be used as cover)
          </label>
          <div className="flex items-center space-x-2">
            <ImageIcon className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              {images[0] ? "Cover image selected" : "No cover image"}
            </span>
          </div>
        </div>
      )}
    </div>
  )
} 