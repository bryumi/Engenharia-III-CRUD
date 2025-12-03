import { BaggageClaim, Home, TicketPercent } from 'lucide-react';
import { Logo } from './Logo';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { FaBed, FaRegUser } from 'react-icons/fa6';
import { usePathname, useRouter } from 'next/navigation';

const links = [
  { href: '/', label: 'Reservas', icon: BaggageClaim },
  { href: '/quartos', label: 'Quartos', icon: FaBed },
  { href: '/promocoes', label: 'Promoções', icon: TicketPercent },
];
export function Sidebar() {
  const [extendSidebar, setExtendSidebar] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/' || pathname === '/cadastrar'; // só ativa na home
    }
    return pathname.startsWith(href); // ativa /quartos e /quartos/cadastrar
  };
  return (
    <aside
      onMouseEnter={() => setExtendSidebar(true)}
      onMouseLeave={() => setExtendSidebar(false)}
      className={twMerge(
        'bg-white2 rounded-r-1 border-primary2 fixed top-0 bottom-0 left-0 z-[99] flex flex-col justify-between gap-[24px] overflow-x-hidden overflow-y-auto border-r p-[24px_12px]! transition-all',
        extendSidebar ? 'w-[270px]' : 'w-[81px]',
      )}
    >
      <Logo />

      <hr className="text-primary2" />
      <nav className="flex flex-col items-center gap-[24px]">
        {links.map((link, index) => (
          <button
            key={index}
            onClick={() => router.push(link.href)}
            type="button"
            className={twMerge(
              'transition-width flex h-[44px] items-center gap-[8px] rounded-[8px] p-[8px]! text-start font-normal transition-all',
              extendSidebar
                ? 'w-[214px] justify-start'
                : 'min-w-[24px] justify-center',
              isActive(link.href)
                ? '[&>svg]:text-white2 [&>span]:text-white2 bg-primary font-bold'
                : 'hover:bg-neutral20 text-primary font-normal',
            )}
          >
            {link.icon && <link.icon size={20} />}
            <span
              className={twMerge(
                'block text-[18px] leading-none font-normal',
                extendSidebar ? 'visible' : 'hidden',
              )}
            >
              {link.label}
            </span>
          </button>
        ))}
      </nav>

      <div className="mt-auto flex flex-col gap-6">
        <div className="h-px bg-zinc-200" />

        <FaRegUser />
      </div>
    </aside>
  );
}
