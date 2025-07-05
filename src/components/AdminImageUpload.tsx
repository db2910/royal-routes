"use client"

import { useState, useRef } from "react"
import { supabase } from "@/src/lib/supabase"
import { Upload, X, Loader2 } from "lucide-react"

interface AdminImageUploadProps {
  onImageUpload: (url: string) => void
  currentImage?: string
  folder?: string
}

export default function AdminImageUpload({ onImageUpload, currentImage, folder = "" }: AdminImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadToStorage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = folder ? `${folder}/${fileName}` : fileName

    const { data, error } = await supabase.storage
      .from('events')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      })

    if (error) {
      console.error('Upload error:', error)
      throw new Error(error.message || 'Image upload failed')
    }

    const { data: { publicUrl } } = supabase.storage
      .from('events')
      .getPublicUrl(filePath)

    if (!publicUrl) {
      throw new Error('Could not get image URL')
    }

    return publicUrl
  }

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }

    setUploading(true)
    try {
      const url = await uploadToStorage(file)
      onImageUpload(url)
    } catch (error) {
      console.error('Upload failed:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
    
    const file = e.dataTransfer.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDragActive(false)
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <div
        className={`
          w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 cursor-pointer transition-colors
          ${currentImage ? 'border-[#B8860B]' : 'border-gray-300 hover:border-[#B8860B]'}
          ${dragActive ? 'border-[#B8860B] bg-[#B8860B]/10' : ''}
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={uploading ? undefined : handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {uploading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="w-8 h-8 text-[#B8860B] animate-spin mb-2" />
            <span className="text-sm">Uploading...</span>
          </div>
        ) : currentImage ? (
          <div className="relative h-full flex items-center">
            <img 
              src={currentImage} 
              alt="Uploaded" 
              className="h-28 w-auto rounded object-contain" 
            />
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 mb-2" />
            <span className="text-sm">Drag & drop or click to upload</span>
          </div>
        )}
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  )
} 