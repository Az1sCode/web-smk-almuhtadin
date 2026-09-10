export interface Major {
  id: number;
  name: string;
  abbreviation: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  competencies: string[];
  careerProspects: string[];
  industryPartners: { name: string; logoUrl?: string }[];
  headOfProgram: {
    name: string;
    photo: string;
    title: string;
  };
  featuredImage: string;
  stats: {
    studentsCount: number;
    labCount: number;
    employmentRate: string;
  };
}

export interface StaffMember {
  id: number;
  name: string;
  nipNuptk?: string;
  position: string;
  category: 'pimpinan' | 'guru' | 'staf';
  department?: string;
  photo: string;
  email?: string;
  orderIndex: number;
}

export interface Achievement {
  id: number;
  title: string;
  recipientName: string;
  recipientType: 'siswa' | 'guru' | 'sekolah';
  competitionName: string;
  level: 'kecamatan' | 'kota' | 'provinsi' | 'nasional' | 'internasional';
  rankTitle: string; // e.g. "Juara 1", "Medali Emas"
  year: number;
  photo: string;
  description: string;
  isFeatured?: boolean;
}

export interface VideoItem {
  id: number;
  title: string;
  youtubeUrl: string;
  youtubeId: string;
  customThumbnail?: string;
  description: string;
  publishedDate: string;
  duration: string;
  isFeatured?: boolean;
}

export interface GalleryImage {
  id: number;
  albumId: number;
  imagePath: string;
  caption: string;
  date: string;
}

export interface Album {
  id: number;
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  imagesCount: number;
  createdAt: string;
}

export interface NewsItem {
  id: number;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  body: string;
  featuredImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readingTime: string;
  isPinned?: boolean;
  viewsCount: number;
}
