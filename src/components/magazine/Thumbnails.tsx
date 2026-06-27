'use client'

import { pages } from '@/lib/magazine-data'
import { cn } from '@/lib/utils'

type ThumbnailsProps = {
  activeIndex: number
  onSelect: (pageIndex: number) => void
}

export function Thumbnails({ activeIndex, onSelect }: ThumbnailsProps) {
  return (
    <nav aria-label="Índice de páginas" className="w-full">
      <ul className="thumbnails-scroll flex items-end gap-2 overflow-x-auto px-4 py-3">
        {pages.map((page, index) => {
          const isActive = index === activeIndex
          return (
            <li key={page.id} className="shrink-0">
              <button
                type="button"
                onClick={() => onSelect(index)}
                aria-current={isActive ? 'true' : undefined}
                className="group flex flex-col items-center gap-1.5 rounded-md p-1 outline-none transition focus-visible:ring-2 focus-visible:ring-[#C9A44A]"
              >
                <span
                  className={cn(
                    'relative flex aspect-[1/1.414] w-10 items-center justify-center overflow-hidden rounded-[3px] border transition-all duration-200',
                    isActive
                      ? 'border-[#C9A44A] shadow-[0_0_0_2px_rgba(201,164,74,0.35),0_2px_8px_rgba(0,0,0,0.4)]'
                      : 'border-white/10 group-hover:border-[#A8B4C0]/50',
                  )}
                >
                  {page.src ? (
                    <img
                      src={page.src}
                      alt=""
                      className="h-full w-full object-cover object-top"
                    />
                  ) : (
                    <span
                      className={cn(
                        'text-[9px] font-semibold',
                        isActive ? 'text-[#C9A44A]' : 'text-[#A8B4C0]/60',
                      )}
                    >
                      {page.id}
                    </span>
                  )}
                </span>
                <span
                  className={cn(
                    'max-w-12 truncate text-[9px] font-medium transition-colors duration-200',
                    isActive ? 'text-[#C9A44A]' : 'text-[#A8B4C0]/55 group-hover:text-[#A8B4C0]',
                  )}
                >
                  {page.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
