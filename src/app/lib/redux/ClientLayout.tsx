'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';

function ClientLayout({ children }: { children: React.ReactNode }) {
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main
      className={`min-h-screen transition-all  duration-500 bg-white text-black overflow-x-hidden
        ${isMobile
          ? 'w-full ml-0'
          : isOpen
          ? 'w-[calc(100%-400px)] ml-[380px]'
          : 'w-[calc(100%-100px)] ml-[100px]'
        }
      `}
    >
      {children}
    </main>
  );
}

export default ClientLayout;
