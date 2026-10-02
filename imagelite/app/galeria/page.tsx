'use client'

import { Template, ImageCard } from '@/components';
import { useImageService } from '@/resource/service';
import { Image } from '@/resource/service';
import { useState } from 'react';

export default function Galeria() {

  const useService = useImageService()
  const [images, setImages] = useState<Image[]>([])
  const [query, setQuery] = useState<string>('')
  const [extension, setExtension] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  async function searchImages() {
    setLoading(true)

    try {
      const result = await useService.buscar(query, extension);
      setImages(result);
      console.log(query, extension)
    } catch (error) {
      console.error("Erro ao buscar imagens:", error)
    } finally {
      setLoading(false)
    }
  }

  function renderImageCard(image: Image, index: number) {
    return (
      <ImageCard
        key={image.id || image.url || index}
        imageName={image.name}
        imageUrl={image.url}
        imageSize={image.size}
        uploadDate={image.uploadDate}
        extension={image.extension}
      />
    )
  }

  function renderImageCards() {
    return images.map((image, index) => renderImageCard(image, index));
  }

  return (
    <Template>

      {/* Área de pesquisa */}
      <section className="flex justify-center px-4 py-8">

        <div className="w-full max-w-6xl">

          {/* Barra de pesquisa */}
          <div className="flex flex-col gap-3 md:flex-row">

            {/* Input */}
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchImages()
                }
              }}
              className="h-12 flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm text-white outline-none transition-all placeholder:text-slate-500 hover:border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              placeholder="Buscar imagens..."
            />

            {/* Select */}
            <select
              value={extension}
              onChange={(event) => setExtension(event.target.value)}
              className="h-12 rounded-xl border border-slate-700 bg-slate-950 px-4 text-sm font-medium text-slate-300 outline-none transition-all hover:border-slate-600 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 md:w-44"
            >
              <option value="">All formats</option>
              <option value="PNG">PNG</option>
              <option value="JPG">JPG</option>
              <option value="GIF">GIF</option>
              <option value="JPEG">JPEG</option>
            </select>

            {/* Search */}
            <button
              className="h-12 min-w-[100px] rounded-xl border-2 border-cyan-400 bg-white px-6 font-extrabold text-slate-950 shadow-[0_0_18px_rgba(34,211,238,0.45)] transition-all duration-200 hover:bg-cyan-50 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              onClick={searchImages}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-cyan-500" />
                </div>
              ) : (
                'Search'
              )}
            </button>

            {/* Add New */}
            <button
              className="h-12 min-w-[110px] rounded-xl border border-cyan-400/40 bg-cyan-400/10 px-6 font-bold text-cyan-300 transition-all duration-200 hover:border-cyan-400 hover:bg-cyan-400/20 hover:text-cyan-200 active:scale-95"
            >
              + Add New
            </button>

          </div>

        </div>

      </section>

      {/* Loading */}
      {loading ? (

        <div className="flex flex-col items-center justify-center py-16">

          <div className="relative">

            <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-800 border-t-cyan-400" />

            <div className="absolute inset-0 h-12 w-12 rounded-full bg-cyan-400/10 blur-xl" />

          </div>

          <p className="mt-5 text-lg font-semibold text-slate-300">
            Carregando imagens...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Aguarde enquanto buscamos seus arquivos.
          </p>

        </div>

      ) : (

        /* Galeria */
        <section className="grid grid-cols-1 gap-5 p-4 md:grid-cols-2 xl:grid-cols-3">
          {renderImageCards()}
        </section>

      )}

    </Template>
  )
}
