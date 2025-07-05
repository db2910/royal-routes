'use client'
import Link from 'next/link'
import { useState, useRef } from 'react'

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export default function AddTourPage() {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [price, setPrice] = useState('')
  const [duration, setDuration] = useState('')
  const [shortDesc, setShortDesc] = useState('')
  const [detailedDesc, setDetailedDesc] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // Image upload state
  const [mainImage, setMainImage] = useState<{ file: File, url: string } | null>(null)
  const [galleryImages, setGalleryImages] = useState<{ file: File, url: string }[]>([])
  const [mainGalleryIndex, setMainGalleryIndex] = useState<number | null>(null)
  const mainInputRef = useRef<HTMLInputElement>(null)
  const galleryInputRef = useRef<HTMLInputElement>(null)

  // Dynamic lists state
  const [itinerary, setItinerary] = useState<string[]>([''])
  const [included, setIncluded] = useState<string[]>([''])
  const [excluded, setExcluded] = useState<string[]>([''])

  // Main image handlers
  async function handleMainImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const url = await readFileAsDataURL(file)
      setMainImage({ file, url })
    }
  }
  function handleMainImageDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      readFileAsDataURL(file).then(url => setMainImage({ file, url }))
    }
  }
  function handleRemoveMainImage() {
    setMainImage(null)
  }

  // Gallery image handlers
  async function handleGalleryChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    const urls = await Promise.all(files.map(readFileAsDataURL))
    setGalleryImages(prev => [...prev, ...files.map((file, i) => ({ file, url: urls[i] }))])
  }
  function handleGalleryDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files || [])
    Promise.all(files.map(readFileAsDataURL)).then(urls => {
      setGalleryImages(prev => [...prev, ...files.map((file, i) => ({ file, url: urls[i] }))])
    })
  }
  function handleRemoveGalleryImage(idx: number) {
    setGalleryImages(prev => prev.filter((_, i) => i !== idx))
    if (mainGalleryIndex === idx) setMainGalleryIndex(null)
    else if (mainGalleryIndex && mainGalleryIndex > idx) setMainGalleryIndex(mainGalleryIndex - 1)
  }
  function handleSetMainGallery(idx: number) {
    setMainGalleryIndex(idx)
  }

  function handleMainDragOver(e: React.DragEvent<HTMLDivElement>) { e.preventDefault() }
  function handleGalleryDragOver(e: React.DragEvent<HTMLDivElement>) { e.preventDefault() }

  // Itinerary handlers
  function handleItineraryChange(idx: number, value: string) {
    setItinerary(list => list.map((item, i) => i === idx ? value : item))
  }
  function addItineraryDay() {
    setItinerary(list => [...list, ''])
  }
  function removeItineraryDay(idx: number) {
    setItinerary(list => list.length === 1 ? [''] : list.filter((_, i) => i !== idx))
  }

  // Included handlers
  function handleIncludedChange(idx: number, value: string) {
    setIncluded(list => list.map((item, i) => i === idx ? value : item))
  }
  function addIncluded() {
    setIncluded(list => [...list, ''])
  }
  function removeIncluded(idx: number) {
    setIncluded(list => list.length === 1 ? [''] : list.filter((_, i) => i !== idx))
  }

  // Excluded handlers
  function handleExcludedChange(idx: number, value: string) {
    setExcluded(list => list.map((item, i) => i === idx ? value : item))
  }
  function addExcluded() {
    setExcluded(list => [...list, ''])
  }
  function removeExcluded(idx: number) {
    setExcluded(list => list.length === 1 ? [''] : list.filter((_, i) => i !== idx))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess('')
    if (!title || !location || !price || !duration || !shortDesc || !detailedDesc) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSuccess('Tour created! (mock)')
    }, 1200)
  }

  return (
    <div className="max-w-2xl mx-auto w-full py-8">
      <div className="mb-6 flex items-center gap-4">
        <Link href="/admin/tours" className="text-[#001934] hover:text-[#b8860b] font-semibold">&larr; Back to Tours</Link>
        <h1 className="text-2xl font-bold text-[#001934]">Add New Tour</h1>
      </div>
      <form className="space-y-6 bg-white rounded-xl shadow p-6" onSubmit={handleSubmit}>
        {/* Error/Success Feedback */}
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded">{error}</div>}
        {success && <div className="bg-green-100 text-green-700 px-4 py-2 rounded">{success}</div>}
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Title</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" placeholder="e.g. Akagera Safari" />
        </div>
        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Location</label>
          <input type="text" value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" placeholder="e.g. Akagera National Park" />
        </div>
        {/* Price & Duration */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#001934] mb-1">Price (USD)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" placeholder="e.g. 1200" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-[#001934] mb-1">Duration</label>
            <input type="text" value={duration} onChange={e => setDuration(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" placeholder="e.g. 3 days" />
          </div>
        </div>
        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Short Description</label>
          <textarea value={shortDesc} onChange={e => setShortDesc(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" rows={2} placeholder="A brief summary..." />
        </div>
        {/* Detailed Description */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Detailed Description</label>
          <textarea value={detailedDesc} onChange={e => setDetailedDesc(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#b8860b] focus:border-transparent" rows={4} placeholder="Full details about the tour..." />
        </div>
        {/* Main Image Upload */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Main Image</label>
          <div
            className={`w-full h-32 border-2 border-dashed rounded-lg flex items-center justify-center text-gray-400 cursor-pointer ${mainImage ? 'border-[#b8860b]' : 'border-gray-300 hover:border-[#b8860b]'}`}
            onClick={() => mainInputRef.current?.click()}
            onDrop={handleMainImageDrop}
            onDragOver={handleMainDragOver}
          >
            {mainImage ? (
              <div className="relative h-full flex items-center">
                <img src={mainImage.url} alt="Main" className="h-28 w-auto rounded object-contain" />
                <button type="button" onClick={e => { e.stopPropagation(); handleRemoveMainImage() }} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-500 hover:bg-red-100"><svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/></svg></button>
              </div>
            ) : (
              <span>(Drag & drop or click to upload main image)</span>
            )}
            <input type="file" accept="image/*" ref={mainInputRef} className="hidden" onChange={handleMainImageChange} />
          </div>
        </div>
        {/* Gallery Images Upload */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Gallery Images</label>
          <div
            className="w-full min-h-[96px] border-2 border-dashed border-[#b8860b] rounded-lg flex flex-wrap items-center gap-2 p-2 cursor-pointer"
            onClick={() => galleryInputRef.current?.click()}
            onDrop={handleGalleryDrop}
            onDragOver={handleGalleryDragOver}
          >
            {galleryImages.length === 0 && <span className="text-gray-400">(Drag & drop or click to upload gallery images)</span>}
            {galleryImages.map((img, idx) => (
              <div key={idx} className="relative group">
                <img
                  src={img.url}
                  alt={`Gallery ${idx + 1}`}
                  className={`h-20 w-20 object-cover rounded border-2 ${mainGalleryIndex === idx ? 'border-[#b8860b]' : 'border-gray-200'} cursor-pointer`}
                  onClick={e => { e.stopPropagation(); handleSetMainGallery(idx) }}
                  title={mainGalleryIndex === idx ? 'Main Image' : 'Set as Main'}
                />
                <button type="button" onClick={e => { e.stopPropagation(); handleRemoveGalleryImage(idx) }} className="absolute top-1 right-1 bg-white/80 rounded-full p-1 text-red-500 hover:bg-red-100 opacity-0 group-hover:opacity-100 transition"><svg width="16" height="16" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M6 6l12 12M6 18L18 6"/></svg></button>
                {mainGalleryIndex === idx && <span className="absolute bottom-1 left-1 bg-[#b8860b] text-white text-xs px-2 py-0.5 rounded">Main</span>}
              </div>
            ))}
            <input type="file" accept="image/*" multiple ref={galleryInputRef} className="hidden" onChange={handleGalleryChange} />
          </div>
        </div>
        {/* Itinerary (dynamic list) */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Itinerary (Day by Day)</label>
          <div className="space-y-2">
            {itinerary.map((item, idx) => (
              <div className="flex gap-2" key={idx}>
                <input
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                  placeholder={`Day ${idx + 1} details...`}
                  value={item}
                  onChange={e => handleItineraryChange(idx, e.target.value)}
                />
                <button type="button" className="bg-gray-200 px-2 rounded text-[#001934] hover:bg-red-100" onClick={() => removeItineraryDay(idx)} disabled={itinerary.length === 1}>-</button>
              </div>
            ))}
            <button type="button" className="text-[#b8860b] font-semibold" onClick={addItineraryDay}>+ Add Day</button>
          </div>
        </div>
        {/* Included/Excluded (dynamic lists) */}
        <div>
          <label className="block text-sm font-medium text-[#001934] mb-1">Included / Excluded</label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="mb-1 font-semibold text-xs text-[#001934]">Included</div>
              <div className="space-y-2">
                {included.map((item, idx) => (
                  <div className="flex gap-2" key={idx}>
                    <input
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g. Park fees"
                      value={item}
                      onChange={e => handleIncludedChange(idx, e.target.value)}
                    />
                    <button type="button" className="bg-gray-200 px-2 rounded text-[#001934] hover:bg-red-100" onClick={() => removeIncluded(idx)} disabled={included.length === 1}>-</button>
                  </div>
                ))}
                <button type="button" className="text-[#b8860b] font-semibold" onClick={addIncluded}>+ Add</button>
              </div>
            </div>
            <div className="flex-1">
              <div className="mb-1 font-semibold text-xs text-[#001934]">Excluded</div>
              <div className="space-y-2">
                {excluded.map((item, idx) => (
                  <div className="flex gap-2" key={idx}>
                    <input
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                      placeholder="e.g. Flights"
                      value={item}
                      onChange={e => handleExcludedChange(idx, e.target.value)}
                    />
                    <button type="button" className="bg-gray-200 px-2 rounded text-[#001934] hover:bg-red-100" onClick={() => removeExcluded(idx)} disabled={excluded.length === 1}>-</button>
                  </div>
                ))}
                <button type="button" className="text-[#b8860b] font-semibold" onClick={addExcluded}>+ Add</button>
              </div>
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div>
          <button type="submit" className="w-full bg-[#001934] text-white font-semibold py-3 rounded-lg hover:bg-[#b8860b] hover:text-[#001934] transition" disabled={loading}>{loading ? 'Creating...' : 'Create Tour'}</button>
        </div>
      </form>
    </div>
  )
} 