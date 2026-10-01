import { useState, useEffect, useCallback } from 'react';
import { contentServices } from '../services/contentServices';
import {
  HeroSlide,
  Major,
  SchoolVisionMissionData,
  SchoolAdvantage,
  NewsItem,
  StaffMember,
  Achievement,
  VideoItem,
  Album,
  GalleryImage,
  SchoolSettings
} from '../types';

export function useSchoolData() {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => contentServices.getHeroSlides());
  const [majors, setMajors] = useState<Major[]>(() => contentServices.getMajors());
  const [visionMission, setVisionMission] = useState<SchoolVisionMissionData>(() => contentServices.getVisionMission());
  const [advantages, setAdvantages] = useState<SchoolAdvantage[]>(() => contentServices.getAdvantages());
  const [news, setNews] = useState<NewsItem[]>(() => contentServices.getNews());
  const [staff, setStaff] = useState<StaffMember[]>(() => contentServices.getStaff());
  const [achievements, setAchievements] = useState<Achievement[]>(() => contentServices.getAchievements());
  const [videos, setVideos] = useState<VideoItem[]>(() => contentServices.getVideos());
  const [albums, setAlbums] = useState<Album[]>(() => contentServices.getAlbums());
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(() => contentServices.getGalleryImages());
  const [settings, setSettings] = useState<SchoolSettings>(() => contentServices.getSchoolSettings());

  const refreshAll = useCallback(() => {
    setHeroSlides(contentServices.getHeroSlides());
    setMajors(contentServices.getMajors());
    setVisionMission(contentServices.getVisionMission());
    setAdvantages(contentServices.getAdvantages());
    setNews(contentServices.getNews());
    setStaff(contentServices.getStaff());
    setAchievements(contentServices.getAchievements());
    setVideos(contentServices.getVideos());
    setAlbums(contentServices.getAlbums());
    setGalleryImages(contentServices.getGalleryImages());
    setSettings(contentServices.getSchoolSettings());
  }, []);

  useEffect(() => {
    const handleUpdate = () => refreshAll();

    window.addEventListener('cms_data_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('cms_data_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [refreshAll]);

  return {
    heroSlides,
    majors,
    visionMission,
    advantages,
    news,
    staff,
    achievements,
    videos,
    albums,
    galleryImages,
    settings,
    refreshAll
  };
}
