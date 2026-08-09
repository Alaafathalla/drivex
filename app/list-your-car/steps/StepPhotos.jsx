'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, Loader2, Star, Trash2, Upload } from 'lucide-react'
import { useToast } from '@/context/ToastContext'

// Simulate image upload by converting File → object URL
async function fakeUpload(file) {
  await new Promise(r => setTimeout(r, 600 + Math.random() * 600))
  return URL.createObjectURL(file)
}

export function StepPhotos({ data, update }) {
  const toast  = useToast()
  const input  = useRef(null)
  const [uploading, setUploading] = useState(false)

  const handleFiles = async (files) => {
    const arr = Array.from(files).slice(0, 8 - data.images.length)
    if (!arr.length) return
    setUploading(true)
    try {
      const urls = await Promise.all(arr.map(fakeUpload))
      update({ images: [...data.images, ...urls] })
      toast({ message: `${urls.length} photo${urls.length > 1 ? 's' : ''} uploaded`, type: 'success' })
    } catch {
      toast({ message: 'Upload failed. Please try again.', type: 'error' })
    } finally {
      setUploading(false)
    }
  }

  const remove = (i) => update({ images: data.images.filter((_, idx) => idx !== i) })
  const setMain = (i) => {
    const imgs = [...data.images]
    const [picked] = imgs.splice(i, 1)
    update({ images: [picked, ...imgs] })
    toast({ message: 'Main photo updated', type: 'success' })
  }

  return (
    <div>
      <h2 className="mb-2 text-[17px] font-bold text-gray-900">Upload Photos</h2>
      <p className="mb-6 text-[13px] text-gray-500">Add up to 8 photos. The first image will be the main listing photo. High-quality photos get 3× more inquiries.</p>

      {/* Upload zone */}
      <motion.div
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files) }}
        onClick={() => !uploading && input.current?.click()}
        whileHover={{ borderColor: '#16a34a' }}
        className={`relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 py-12 transition cursor-pointer ${uploading ? 'opacity-60 cursor-wait' : 'hover:bg-green-50'}`}
      >
        {uploading
          ? <Loader2 size={32} className="animate-spin text-green-500" />
          : <Upload size={28} className="text-gray-400" />
        }
        <div className="text-center">
          <p className="font-semibold text-gray-700">{uploading ? 'Uploading…' : 'Click or drag & drop photos'}</p>
          <p className="mt-1 text-[12px] text-gray-400">PNG, JPG — max 10 MB each · {8 - data.images.length} slots remaining</p>
        </div>
        <input ref={input} type="file" accept="image/*" multiple className="hidden"
          onChange={e => handleFiles(e.target.files)} />
      </motion.div>

      {/* Preview grid */}
      {data.images.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <AnimatePresence>
            {data.images.map((src, i) => (
              <motion.div key={src} layout
                initial={{ opacity: 0, scale: .88 }} animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .88 }} transition={{ duration: .25 }}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-100"
                style={{ aspectRatio: '4/3' }}>
                <img src={src} alt={`Photo ${i+1}`} className="h-full w-full object-cover" />

                {/* Main badge */}
                {i === 0 && (
                  <div className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-green-600 px-2 py-0.5">
                    <Star size={9} className="text-white" />
                    <span className="text-[9px] font-black text-white">MAIN</span>
                  </div>
                )}

                {/* Actions overlay */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition group-hover:opacity-100">
                  {i !== 0 && (
                    <button onClick={() => setMain(i)}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-green-700 hover:bg-white transition">
                      <Star size={14} />
                    </button>
                  )}
                  <button onClick={() => remove(i)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-red-500 hover:bg-white transition">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {data.images.length === 0 && (
        <p className="mt-4 text-center text-[12px] text-gray-400">No photos yet. At least 1 photo is recommended.</p>
      )}
    </div>
  )
}
