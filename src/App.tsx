import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ScrollToTop } from './components/ScrollToTop';

// Pages
import { HomePage } from './pages/HomePage';
import { NewsPage } from './pages/NewsPage';
import { NewsDetailPage } from './pages/NewsDetailPage';
import { ProfilePage } from './pages/ProfilePage';
import { VisionMissionPage } from './pages/VisionMissionPage';
import { MajorsPage } from './pages/MajorsPage';
import { MajorDetailPage } from './pages/MajorDetailPage';
import { StaffPage } from './pages/StaffPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { GalleryPage } from './pages/GalleryPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';
import { StyleGuideShowcasePage } from './pages/StyleGuideShowcasePage';
import { AdminRouteGuard } from './components/AdminRouteGuard';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin') || location.pathname.startsWith('/style-guide');

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-canvas text-ink font-sans selection:bg-navy selection:text-white">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AppLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/style-guide" element={<StyleGuideShowcasePage />} />
          <Route path="/berita" element={<NewsPage />} />
          <Route path="/berita/:slug" element={<NewsDetailPage />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/visi-misi" element={<VisionMissionPage />} />
          <Route path="/jurusan" element={<MajorsPage />} />
          <Route path="/jurusan/:slug" element={<MajorDetailPage />} />
          <Route path="/pengurus" element={<StaffPage />} />
          <Route path="/prestasi" element={<AchievementsPage />} />
          <Route path="/galeri" element={<GalleryPage />} />
          <Route 
            path="/admin" 
            element={
              <AdminRouteGuard>
                <AdminDashboardPage />
              </AdminRouteGuard>
            } 
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
