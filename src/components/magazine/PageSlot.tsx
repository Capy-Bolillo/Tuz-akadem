import type { MagazinePage } from '@/lib/magazine-data'
import { cn } from '@/lib/utils'
import logoSinFondo from '@/assets/logo_sinFondo.png'

type PageSlotProps = {
  page?: MagazinePage
  pageNumber?: number
  side: 'left' | 'right'
}

export function PageSlot({ page, pageNumber, side }: PageSlotProps) {
  if (!page) {
    return <div className="h-full w-full bg-muted" aria-hidden />
  }

  return (
    <div
      className={cn(
        'relative flex h-full w-full flex-col overflow-hidden bg-card text-card-foreground',
        side === 'left'
          ? 'shadow-[inset_-20px_0_32px_-20px_rgba(0,0,0,0.45)]'
          : 'shadow-[inset_20px_0_32px_-20px_rgba(0,0,0,0.45)]',
      )}
    >
      {page.src ? (
        <img
          src={page.src}
          alt={page.label}
          className="h-full w-full object-cover object-top"
          draggable={false}
        />
      ) : (
        /* Placeholder con identidad AKADEM */
        <div className="flex h-full w-full flex-col items-center justify-center gap-5 bg-[#F5F5F0] p-6">
          <img
            src={logoSinFondo}
            alt="AKADEM"
            className="h-14 w-auto opacity-20"
            aria-hidden
          />
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#1B2B6B]/50">
              {page.label}
            </p>
            {page.kind === 'service' && page.serviceNumber && (
              <p className="mt-1 text-[9px] tracking-wider text-[#C9A44A]/60">
                Servicio {page.serviceNumber}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Número de página — badge dorado */}
      {pageNumber ? (
        <span
          className={cn(
            'pointer-events-none absolute bottom-2.5 flex size-[22px] items-center justify-center rounded-full',
            'bg-[#1B2B6B]/80 text-[10px] font-semibold text-[#C9A44A] leading-none backdrop-blur-sm',
            side === 'left' ? 'left-3' : 'right-3',
          )}
        >
          {pageNumber}
        </span>
      ) : null}
    </div>
  )
}
