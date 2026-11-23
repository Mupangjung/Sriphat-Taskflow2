import { AuthProvider } from './context/AuthContext';
import { ContentProvider } from './context/ContentContext';
import { AccountPage } from './pages/AccountPage';
import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AppStateProvider } from './context/AppStateContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CopyFeedbackOverlays, OfflineBanner } from './components/StatusBanners';
import { SearchPage } from './pages/SearchPage';
import { DiseaseOverviewPage } from './pages/DiseaseOverviewPage';
import { FocusDetailPage } from './pages/FocusDetailPage';
import { ComparePage } from './pages/ComparePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <AuthProvider><ContentProvider><AppStateProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#4338CA] focus:text-white focus:text-sm focus:font-semibold"
          >
            ข้ามไปยังเนื้อหาหลัก
          </a>

          <Header />
          <OfflineBanner />

          <div id="main-content" className="flex-1">
            <Routes>
              <Route path="/account" element={<AccountPage />} />
              <Route path="/" element={<SearchPage />} />
              <Route path="/disease/:diseaseId" element={<DiseaseOverviewPage />} />
              <Route path="/disease/:diseaseId/focus/:focusId" element={<FocusDetailPage />} />
              <Route path="/focus/:focusId" element={<FocusDetailPage />} />
              <Route path="/compare" element={<ComparePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
          <CopyFeedbackOverlays />
        </div>
      </BrowserRouter>
    </AppStateProvider></ContentProvider></AuthProvider>
  );
}
