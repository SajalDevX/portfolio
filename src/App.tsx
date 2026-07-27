import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Sidebar } from './components/layout/Sidebar';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { PostsPage } from './pages/PostsPage';
import { PostDetailPage } from './pages/PostDetailPage';
import { TutorialsPage } from './pages/TutorialsPage';
import { PhotosPage } from './pages/PhotosPage';
import { SocialsPage } from './pages/SocialsPage';
import { usePalette, useAccentColor } from './hooks/useTheme';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [palette] = usePalette();
  const [accentColor] = useAccentColor();

  // Initialize theme on mount
  useEffect(() => {
    document.documentElement.classList.remove(
      'latte',
      'frappe',
      'macchiato',
      'mocha'
    );
    document.documentElement.classList.add(palette);
  }, [palette]);

  useEffect(() => {
    const colorValue = `var(--color-${accentColor})`;
    document.documentElement.style.setProperty(
      '--current-accent-color',
      colorValue
    );
  }, [accentColor]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <Router>
      <div className="text-text mx-auto flex min-h-screen max-w-[90%] flex-col md:max-w-[80%]">
        <Header toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

        <main className="flex-1 px-0 py-8 md:px-5">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/posts" element={<PostsPage />} />
            <Route path="/posts/:slug" element={<PostDetailPage />} />
            <Route path="/tutorials" element={<TutorialsPage />} />
            <Route path="/photos" element={<PhotosPage />} />
            <Route path="/socials" element={<SocialsPage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
