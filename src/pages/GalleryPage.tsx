import React, { useState } from 'react';
import { 
  Camera, 
  VideoCamera, 
  Play, 
  MagnifyingGlassPlus, 
  CalendarBlank, 
  Clock 
} from '@phosphor-icons/react';
import { albumsData, galleryImagesData, videosData } from '../data/mockData';
import { LightboxModal } from '../components/LightboxModal';
import { VideoModal } from '../components/VideoModal';

export const GalleryPage: React.FC = () => {
  const [mediaMode, setMediaMode] = useState<'photos' | 'videos'>('photos');
  const [selectedAlbumId, setSelectedAlbumId] = useState<number | 'all'>('all');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Video modal state
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  const filteredImages = selectedAlbumId === 'all'
    ? galleryImagesData
    : galleryImagesData.filter((img) => img.albumId === selectedAlbumId);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12">
      {/* Header Banner */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-mono uppercase tracking-widest text-azure font-bold">
          Dokumentasi Visual & Kanal Resmi
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight">
          Galeri Kegiatan & Video Sekolah
        </h1>
        <p className="text-sm sm:text-base text-ink-muted leading-relaxed">
          Saksikan langsung atmosfer pembelajaran vokasi, fasilitas laboratorium mutakhir, dan ragam aktivitas kesiswaan di SMK Al-Muhtadin.
        </p>
      </div>

      {/* Segmented Media Mode Switcher */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 rounded-full bg-slate-200/80 border border-slate-300/60 shadow-inner">
          <button
            onClick={() => setMediaMode('photos')}
            type="button"
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              mediaMode === 'photos'
                ? 'bg-navy text-white shadow-md'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <Camera size={18} weight="bold" />
            <span>Foto Kegiatan ({galleryImagesData.length})</span>
          </button>
          <button
            onClick={() => setMediaMode('videos')}
            type="button"
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all ${
              mediaMode === 'videos'
                ? 'bg-navy text-white shadow-md'
                : 'text-ink-muted hover:text-ink'
            }`}
          >
            <VideoCamera size={18} weight="bold" />
            <span>Video YouTube ({videosData.length})</span>
          </button>
        </div>
      </div>

      {/* VIEW A: FOTO KEGIATAN */}
      {mediaMode === 'photos' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Album Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200">
            <button
              onClick={() => setSelectedAlbumId('all')}
              type="button"
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                selectedAlbumId === 'all'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-ink-muted border border-slate-200 hover:text-navy hover:bg-slate-50'
              }`}
            >
              Semua Album Foto
            </button>
            {albumsData.map((album) => (
              <button
                key={album.id}
                onClick={() => setSelectedAlbumId(album.id)}
                type="button"
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedAlbumId === album.id
                    ? 'bg-navy text-white shadow-sm'
                    : 'bg-white text-ink-muted border border-slate-200 hover:text-navy hover:bg-slate-50'
                }`}
              >
                {album.name}
              </button>
            ))}
          </div>

          {/* Bento Photo Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((img, idx) => (
              <div
                key={img.id}
                onClick={() => openLightbox(idx)}
                className="group relative rounded-3xl overflow-hidden aspect-[4/3] bg-slate-900 cursor-pointer shadow-whisper hover:shadow-elevated transition-all border border-slate-200"
              >
                <img
                  src={img.imagePath}
                  alt={img.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3.5 right-3.5 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform scale-90 group-hover:scale-100">
                  <MagnifyingGlassPlus size={18} weight="bold" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                  <p className="text-xs sm:text-sm font-semibold line-clamp-2">
                    {img.caption}
                  </p>
                  <span className="text-[11px] font-mono text-slate-300 block">
                    {img.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW B: VIDEO YOUTUBE */}
      {mediaMode === 'videos' && (
        <div className="space-y-8 animate-fadeIn">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {videosData.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo({ id: video.youtubeId, title: video.title })}
                className="group bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-whisper hover:shadow-elevated transition-all cursor-pointer flex flex-col justify-between hover:-translate-y-1 duration-300"
              >
                {/* 16:9 Thumbnail Poster with Tactile Play Icon */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-95 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white text-navy flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-azure group-hover:text-white transition-all duration-300">
                      <Play size={24} weight="fill" className="translate-x-0.5" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="px-2.5 py-1 rounded-md bg-ink/80 backdrop-blur-md text-white font-mono text-xs">
                      {video.duration}
                    </span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-mono text-ink-muted">
                    <CalendarBlank size={14} />
                    <span>Rilis: {video.publishedDate}</span>
                  </div>

                  <h3 className="font-bold text-base sm:text-lg text-ink group-hover:text-navy transition-colors line-clamp-2 leading-snug">
                    {video.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-muted line-clamp-2 leading-relaxed pt-1">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal for Photos */}
      <LightboxModal
        images={filteredImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1))}
        onNext={() => setCurrentImageIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0))}
      />

      {/* Video Modal Player for YouTube */}
      {activeVideo && (
        <VideoModal
          youtubeId={activeVideo.id}
          title={activeVideo.title}
          isOpen={true}
          onClose={() => setActiveVideo(null)}
        />
      )}
    </div>
  );
};
