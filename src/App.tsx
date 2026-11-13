import { useCallback, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MenuModal } from './components/MenuModal';
import { AboutPage } from './components/AboutPage';
import { SectionPage } from './components/SectionPage';
import { findMenuItemByPath } from './data/menuItems';

function parseRouteState(rawUrl?: string): { path: string; bagOpen: boolean; fullUrl: string } {
  const url = rawUrl
    ? new URL(rawUrl, window.location.origin)
    : new URL(window.location.href);
  const rawPath = url.pathname || '/';
  const path = rawPath === '/' ? '/' : rawPath.replace(/\/+$/, '').toLowerCase();
  const bagOpen = path === '/' && url.searchParams.get('bag') === 'open';
  const fullUrl = bagOpen ? '/?bag=open' : path;
  return { path, bagOpen, fullUrl };
}

export default function App() {
  const [route, setRoute] = useState(() => parseRouteState());
  const [lastSectionPath, setLastSectionPath] = useState<string>(() => {
    const initial = parseRouteState();
    return findMenuItemByPath(initial.path) ? initial.path : '/';
  });
  const [lastHomeUrl, setLastHomeUrl] = useState<string>(() => {
    const initial = parseRouteState();
    return initial.path === '/' ? initial.fullUrl : '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const next = parseRouteState();
      setRoute(next);
      if (findMenuItemByPath(next.path) || next.path === '/') {
        setLastSectionPath(next.path);
      }
      if (next.path === '/') {
        setLastHomeUrl(next.fullUrl);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = useCallback((target: string) => {
    const next = parseRouteState(target);
    const currentFull = `${window.location.pathname || '/'}${window.location.search || ''}`;
    if (currentFull !== next.fullUrl) {
      window.history.pushState({}, '', next.fullUrl);
    }
    if (findMenuItemByPath(next.path) || next.path === '/') {
      setLastSectionPath(next.path);
    }
    if (next.path === '/') {
      setLastHomeUrl(next.fullUrl);
    }
    setRoute(next);
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  const isMenuPage = route.path === '/menu';
  const activeSection = findMenuItemByPath(route.path);

  if (isMenuPage) {
    return (
      <div className="min-h-screen bg-[#f3e9d5] text-[#3a1222] selection:bg-[#F000D8] selection:text-white">
        <main>
          <MenuModal
            activePath={lastSectionPath}
            onNavigate={navigateTo}
            onClose={() => navigateTo(lastHomeUrl)}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F3EEDF] text-[#171717] relative selection:bg-[#F000D8] selection:text-white">
      {/* Editorial Header */}
      <Header
        onOpenMenu={() => navigateTo('/menu')}
        isLightBackdrop={!activeSection && route.bagOpen}
      />

      {/* Active Route View */}
      <main>
        {activeSection ? (
          activeSection.path === '/about' ? (
            <AboutPage onNavigate={navigateTo} />
          ) : (
            <SectionPage
              section={activeSection}
              onNavigate={navigateTo}
              onOpenMenu={() => navigateTo('/menu')}
            />
          )
        ) : (
          <HeroSection
            isBagOpen={route.bagOpen}
            onOpenBag={() => navigateTo('/?bag=open')}
            onCloseBag={() => navigateTo('/')}
            onNavigate={navigateTo}
          />
        )}
      </main>
    </div>
  );
}
