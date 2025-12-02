'use client';

import { Sidebar } from '@/componentes/Sidebar';

const PagesRootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <main className="h-[revert-layer] min-h-dvh overflow-x-auto bg-[#F3F6FF]">
      <div className="min-w-[1300px]">
        <Sidebar />
        <div>
          <div className="py-[48px]! pr-[50px]! pl-[116px]!">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default PagesRootLayout;
