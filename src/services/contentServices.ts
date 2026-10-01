import {
  Major,
  StaffMember,
  Achievement,
  VideoItem,
  NewsItem,
  Album,
  GalleryImage,
  HeroSlide,
  SchoolAdvantage,
  SchoolVisionMissionData,
  AdminUser,
  SchoolSettings
} from '../types';

import {
  heroSlidesData,
  majorsData,
  schoolVisionMissionData,
  schoolAdvantagesData,
  newsData,
  staffData,
  achievementsData,
  videosData,
  albumsData,
  galleryImagesData,
  schoolMetadata
} from '../data/mockData';

// Storage Helper
function getStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.error(`Failed to save ${key} to localStorage:`, err);
  }
}

// Initial Settings Builder
const initialSettings: SchoolSettings = {
  name: schoolMetadata.name,
  tagline: schoolMetadata.tagline,
  npsn: schoolMetadata.npsn,
  accreditation: schoolMetadata.accreditation,
  foundedYear: schoolMetadata.foundedYear,
  address: schoolMetadata.address,
  phone: schoolMetadata.phone,
  whatsappNumber: schoolMetadata.whatsappNumber,
  whatsappUrl: schoolMetadata.whatsappUrl,
  email: schoolMetadata.email,
  principal: {
    name: schoolMetadata.principal.name,
    title: schoolMetadata.principal.title,
    photo: schoolMetadata.principal.photo,
    quote: schoolMetadata.principal.quote
  },
  socialMedia: {
    instagram: "https://instagram.com/smkalmuhtadin",
    youtube: "https://youtube.com/@smkalmuhtadin",
    facebook: "https://facebook.com/smkalmuhtadin",
    tiktok: "https://tiktok.com/@smkalmuhtadin"
  }
};

const initialUsers: AdminUser[] = [
  {
    id: 1,
    name: 'Super Administrator',
    email: 'admin@smkalmuhtadin.sch.id',
    role: 'superadmin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    lastLogin: 'Aktif sekarang'
  },
  {
    id: 2,
    name: 'Staff Humas & Konten',
    email: 'editor@smkalmuhtadin.sch.id',
    role: 'editor',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
    lastLogin: 'Kemarin, 14:20 WIB'
  }
];

export const contentServices = {
  // --- 1. HERO SLIDES ---
  getHeroSlides: (): HeroSlide[] => {
    return getStorage<HeroSlide[]>('cms_hero_slides', heroSlidesData);
  },
  saveHeroSlide: (slide: Omit<HeroSlide, 'id'> & { id?: number }): HeroSlide => {
    const list = contentServices.getHeroSlides();
    if (slide.id) {
      const updated = list.map((s) => (s.id === slide.id ? (slide as HeroSlide) : s));
      setStorage('cms_hero_slides', updated);
      return slide as HeroSlide;
    } else {
      const newSlide: HeroSlide = {
        ...slide,
        id: Date.now()
      };
      setStorage('cms_hero_slides', [...list, newSlide]);
      return newSlide;
    }
  },
  deleteHeroSlide: (id: number): void => {
    const list = contentServices.getHeroSlides();
    setStorage('cms_hero_slides', list.filter((s) => s.id !== id));
  },
  reorderHeroSlides: (slides: HeroSlide[]): void => {
    setStorage('cms_hero_slides', slides);
  },

  // --- 2. VISION & MISSION ---
  getVisionMission: (): SchoolVisionMissionData => {
    return getStorage<SchoolVisionMissionData>('cms_vision_mission', schoolVisionMissionData);
  },
  updateVisionMission: (data: SchoolVisionMissionData): void => {
    setStorage('cms_vision_mission', data);
  },

  // --- 3. ADVANTAGES (3 PILAR) ---
  getAdvantages: (): SchoolAdvantage[] => {
    return getStorage<SchoolAdvantage[]>('cms_advantages', schoolAdvantagesData);
  },
  saveAdvantage: (item: Omit<SchoolAdvantage, 'id'> & { id?: number }): SchoolAdvantage => {
    const list = contentServices.getAdvantages();
    if (item.id) {
      const updated = list.map((a) => (a.id === item.id ? (item as SchoolAdvantage) : a));
      setStorage('cms_advantages', updated);
      return item as SchoolAdvantage;
    } else {
      const newItem: SchoolAdvantage = {
        ...item,
        id: Date.now()
      };
      setStorage('cms_advantages', [...list, newItem]);
      return newItem;
    }
  },
  deleteAdvantage: (id: number): void => {
    const list = contentServices.getAdvantages();
    setStorage('cms_advantages', list.filter((a) => a.id !== id));
  },

  // --- 4. MAJORS (4 JURUSAN) ---
  getMajors: (): Major[] => {
    return getStorage<Major[]>('cms_majors', majorsData);
  },
  updateMajor: (major: Major): void => {
    const list = contentServices.getMajors();
    const updated = list.map((m) => (m.id === major.id ? major : m));
    setStorage('cms_majors', updated);
  },

  // --- 5. NEWS & ANNOUNCEMENTS ---
  getNews: (): NewsItem[] => {
    return getStorage<NewsItem[]>('cms_news', newsData);
  },
  saveNews: (item: Omit<NewsItem, 'id'> & { id?: number }): NewsItem => {
    const list = contentServices.getNews();
    if (item.id) {
      const updated = list.map((n) => (n.id === item.id ? (item as NewsItem) : n));
      setStorage('cms_news', updated);
      return item as NewsItem;
    } else {
      const newItem: NewsItem = {
        ...item,
        id: Date.now()
      };
      setStorage('cms_news', [newItem, ...list]);
      return newItem;
    }
  },
  deleteNews: (id: number): void => {
    const list = contentServices.getNews();
    setStorage('cms_news', list.filter((n) => n.id !== id));
  },

  // --- 6. STAFF & TEACHERS (GTK) ---
  getStaff: (): StaffMember[] => {
    return getStorage<StaffMember[]>('cms_staff', staffData);
  },
  saveStaff: (item: Omit<StaffMember, 'id'> & { id?: number }): StaffMember => {
    const list = contentServices.getStaff();
    if (item.id) {
      const updated = list.map((s) => (s.id === item.id ? (item as StaffMember) : s));
      setStorage('cms_staff', updated);
      return item as StaffMember;
    } else {
      const newItem: StaffMember = {
        ...item,
        id: Date.now()
      };
      setStorage('cms_staff', [...list, newItem]);
      return newItem;
    }
  },
  deleteStaff: (id: number): void => {
    const list = contentServices.getStaff();
    setStorage('cms_staff', list.filter((s) => s.id !== id));
  },

  // --- 7. ACHIEVEMENTS ---
  getAchievements: (): Achievement[] => {
    return getStorage<Achievement[]>('cms_achievements', achievementsData);
  },
  saveAchievement: (item: Omit<Achievement, 'id'> & { id?: number }): Achievement => {
    const list = contentServices.getAchievements();
    if (item.id) {
      const updated = list.map((a) => (a.id === item.id ? (item as Achievement) : a));
      setStorage('cms_achievements', updated);
      return item as Achievement;
    } else {
      const newItem: Achievement = {
        ...item,
        id: Date.now()
      };
      setStorage('cms_achievements', [newItem, ...list]);
      return newItem;
    }
  },
  deleteAchievement: (id: number): void => {
    const list = contentServices.getAchievements();
    setStorage('cms_achievements', list.filter((a) => a.id !== id));
  },

  // --- 8. VIDEOS (YouTube) ---
  getVideos: (): VideoItem[] => {
    return getStorage<VideoItem[]>('cms_videos', videosData);
  },
  saveVideo: (item: Omit<VideoItem, 'id'> & { id?: number }): VideoItem => {
    const list = contentServices.getVideos();
    if (item.id) {
      const updated = list.map((v) => (v.id === item.id ? (item as VideoItem) : v));
      setStorage('cms_videos', updated);
      return item as VideoItem;
    } else {
      const newItem: VideoItem = {
        ...item,
        id: Date.now()
      };
      setStorage('cms_videos', [newItem, ...list]);
      return newItem;
    }
  },
  deleteVideo: (id: number): void => {
    const list = contentServices.getVideos();
    setStorage('cms_videos', list.filter((v) => v.id !== id));
  },

  // --- 9. GALLERY & ALBUMS ---
  getAlbums: (): Album[] => {
    return getStorage<Album[]>('cms_albums', albumsData);
  },
  getGalleryImages: (): GalleryImage[] => {
    return getStorage<GalleryImage[]>('cms_gallery_images', galleryImagesData);
  },
  saveAlbum: (item: Omit<Album, 'id'> & { id?: number }): Album => {
    const list = contentServices.getAlbums();
    if (item.id) {
      const updated = list.map((a) => (a.id === item.id ? (item as Album) : a));
      setStorage('cms_albums', updated);
      return item as Album;
    } else {
      const newItem: Album = {
        ...item,
        id: Date.now()
      };
      setStorage('cms_albums', [...list, newItem]);
      return newItem;
    }
  },
  saveGalleryImage: (img: Omit<GalleryImage, 'id'> & { id?: number }): GalleryImage => {
    const list = contentServices.getGalleryImages();
    if (img.id) {
      const updated = list.map((i) => (i.id === img.id ? (img as GalleryImage) : i));
      setStorage('cms_gallery_images', updated);
      return img as GalleryImage;
    } else {
      const newImg: GalleryImage = {
        ...img,
        id: Date.now()
      };
      setStorage('cms_gallery_images', [newImg, ...list]);
      return newImg;
    }
  },
  deleteGalleryImage: (id: number): void => {
    const list = contentServices.getGalleryImages();
    setStorage('cms_gallery_images', list.filter((i) => i.id !== id));
  },

  // --- 10. SCHOOL SETTINGS & KEPSEK ---
  getSchoolSettings: (): SchoolSettings => {
    return getStorage<SchoolSettings>('cms_school_settings', initialSettings);
  },
  updateSchoolSettings: (settings: SchoolSettings): void => {
    setStorage('cms_school_settings', settings);
  },

  // --- 11. USERS & ACCESS ---
  getAdminUsers: (): AdminUser[] => {
    return getStorage<AdminUser[]>('cms_admin_users', initialUsers);
  },
  saveAdminUser: (user: Omit<AdminUser, 'id'> & { id?: number }): AdminUser => {
    const list = contentServices.getAdminUsers();
    if (user.id) {
      const updated = list.map((u) => (u.id === user.id ? (user as AdminUser) : u));
      setStorage('cms_admin_users', updated);
      return user as AdminUser;
    } else {
      const newUser: AdminUser = {
        ...user,
        id: Date.now()
      };
      setStorage('cms_admin_users', [...list, newUser]);
      return newUser;
    }
  },
  deleteAdminUser: (id: number): void => {
    const list = contentServices.getAdminUsers();
    setStorage('cms_admin_users', list.filter((u) => u.id !== id));
  }
};
