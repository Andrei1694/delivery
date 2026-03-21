import { Outlet, useLocation } from '@tanstack/react-router';
import { useLayoutEffect, useRef, useState } from 'react';
import BottomNav from './components/BottomNav';
import { NAV_ITEMS } from './navigation/navItems';

const PEER_INDEX = { '/': 0, '/search': 1, '/order-history': 2, '/profile': 3 };

function App() {
  const { pathname } = useLocation();
  const prevRef = useRef(pathname);
  const [animClass, setAnimClass] = useState('');

  useLayoutEffect(() => {
    const prev = prevRef.current;
    prevRef.current = pathname;
    const prevIdx = PEER_INDEX[prev] ?? -1;
    const nextIdx = PEER_INDEX[pathname] ?? -1;
    if (prevIdx !== -1 && nextIdx !== -1 && prevIdx !== nextIdx) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnimClass(nextIdx > prevIdx ? 'page-enter-right' : 'page-enter-left');
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnimClass('');
    }
  }, [pathname]);

  const isPeer = pathname in PEER_INDEX;

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className={animClass} onAnimationEnd={() => setAnimClass('')}>
        <Outlet />
      </div>
      {isPeer && <BottomNav navItems={NAV_ITEMS} />}
    </main>
  );
}

export default App;
