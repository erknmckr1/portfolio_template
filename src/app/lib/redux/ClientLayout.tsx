'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/lib/redux/store';

function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isOpen = useSelector((state: RootState) => state.sidebar.isOpen);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isFullWidthPage = pathname === '/login' || pathname === '/admin';

  return (
    <main
      className={`min-h-screen transition-all duration-500 bg-white text-black overflow-x-hidden
        ${isFullWidthPage
          ? 'w-full ml-0'
          : isMobile
            ? 'w-full ml-0 pt-20'
            : isOpen
              ? 'w-[calc(100%-360px)] ml-[360px]'
              : 'w-[calc(100%-100px)] ml-[100px]'
        }
      `}
    >
      {children}
    </main>
  );
}

export default ClientLayout;
