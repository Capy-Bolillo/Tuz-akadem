import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { magazineMeta, pages } from '@/lib/magazine-data'
import { cn } from '@/lib/utils'
import { PageSlot } from './PageSlot'
import { Thumbnails } from './Thumbnails'
import logoSinFondo from '@/assets/logo_sinFondo.png'

type Leaf = {
  index: number
  frontPageIndex: number
  backPageIndex: number | null
}

function buildSpreadLeaves(): Leaf[] {
  const leaves: Leaf[] = []
  for (let i = 0; i < pages.length; i += 2) {
    leaves.push({
      index: i / 2,
      frontPageIndex: i,
      backPageIndex: i + 1 < pages.length ? i + 1 : null,
    })
  }
  return leaves
}

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    const update = () => setIsMobile(mql.matches)
    update()
    mql.addEventListener('change', update)
    return () => mql.removeEventListener('change', update)
  }, [breakpoint])
  return isMobile
}

export function Flipbook() {
  const spreadLeaves = useMemo(buildSpreadLeaves, [])
  const isMobile = useIsMobile()
  const spread = !isMobile

  const maxLocation = spread ? spreadLeaves.length : pages.length - 1
  const [location, setLocation] = useState(0)

  useEffect(() => {
    setLocation((l) => Math.min(l, maxLocation))
  }, [maxLocation])

  const isAtStart = location === 0
  const isAtEnd = location === maxLocation

  const goNext = useCallback(() => {
    setLocation((l) => Math.min(l + 1, maxLocation))
  }, [maxLocation])

  const goPrev = useCallback(() => {
    setLocation((l) => Math.max(l - 1, 0))
  }, [])

  const goToPageIndex = useCallback(
    (pageIndex: number) => {
      if (spread) {
        setLocation(Math.min(Math.floor(pageIndex / 2), maxLocation))
      } else {
        setLocation(Math.min(pageIndex, maxLocation))
      }
    },
    [spread, maxLocation],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [goNext, goPrev])

  const activeIndex = spread ? Math.min(location * 2, pages.length - 1) : location

  const indicatorText = spread
    ? isAtStart
      ? 'Portada'
      : isAtEnd
        ? 'Datos de Contacto'
        : `Páginas ${location * 2} – ${Math.min(location * 2 + 1, pages.length)} de ${pages.length}`
    : `${pages[location].label} · Página ${location + 1} de ${pages.length}`

  const leaves: Leaf[] = spread
    ? spreadLeaves
    : pages.map((_, i) => ({ index: i, frontPageIndex: i, backPageIndex: null }))
  const numLeaves = leaves.length

  return (
    <div className="flex w-full flex-col items-center gap-5">

      {/* Header con marca AKADEM */}
      <header className="flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-3">
          <img
            src={logoSinFondo}
            alt="AKADEM logo"
            className="h-12 w-auto drop-shadow-[0_2px_8px_rgba(201,164,74,0.35)]"
          />
          <div className="flex flex-col items-start gap-0.5">
            <h1 className="text-2xl font-bold tracking-[0.32em] text-white leading-none">
              {magazineMeta.title}
            </h1>
            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#C9A44A] leading-none">
              {magazineMeta.subtitle}
            </p>
          </div>
        </div>
        <p className="text-[11px] tracking-[0.22em] uppercase text-[#A8B4C0]/80">
          {magazineMeta.issue} &middot; {magazineMeta.date}
        </p>

        {/* Separador dorado */}
        <div className="flex items-center gap-3 w-48">
          <div className="h-px flex-1 bg-[#C9A44A]/30" />
          <div className="h-1 w-1 rounded-full bg-[#C9A44A]/60" />
          <div className="h-px flex-1 bg-[#C9A44A]/30" />
        </div>
      </header>

      {/* Flipbook viewer */}
      <div className="flex w-full items-center justify-center gap-3 sm:gap-5">

        {/* Botón anterior */}
        <button
          type="button"
          onClick={goPrev}
          disabled={isAtStart}
          aria-label="Página anterior"
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200 sm:size-11',
            'border-[#C9A44A]/40 bg-white/5 text-[#A8B4C0] backdrop-blur-sm',
            'hover:border-[#C9A44A] hover:bg-[#C9A44A] hover:text-[#0a1225] hover:shadow-[0_0_16px_rgba(201,164,74,0.4)]',
            'disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-white/5 disabled:hover:border-[#C9A44A]/40 disabled:hover:text-[#A8B4C0] disabled:hover:shadow-none',
          )}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </button>

        {/* Libro */}
        <div
          className="relative shrink-0"
          style={{
            height: 'min(62vh, 520px)',
            aspectRatio: spread ? '2 / 1.414' : '1 / 1.414',
            perspective: '2400px',
            filter: 'drop-shadow(0 30px 60px rgba(7,13,31,0.8)) drop-shadow(0 8px 20px rgba(27,43,107,0.4))',
          }}
        >
          <div className="relative h-full w-full" style={{ transformStyle: 'preserve-3d' }}>
            {spread ? (
              <>
                <div className="absolute left-0 top-0 h-full w-1/2 rounded-l-sm bg-muted shadow-md" aria-hidden />
                <div className="absolute right-0 top-0 h-full w-1/2 rounded-r-sm bg-muted shadow-md" aria-hidden />
              </>
            ) : (
              <div className="absolute inset-0 rounded-sm bg-muted shadow-md" aria-hidden />
            )}

            {leaves.map((leaf) => {
              const flipped = leaf.index < location
              const zIndex = flipped ? leaf.index + 1 : numLeaves - leaf.index
              return (
                <div
                  key={leaf.index}
                  className={cn(
                    'absolute top-0 h-full origin-left transition-transform duration-700 ease-in-out',
                    spread ? 'right-0 w-1/2' : 'inset-x-0',
                  )}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
                    zIndex,
                  }}
                >
                  <div
                    className={cn('absolute inset-0 overflow-hidden', spread ? 'rounded-r-sm' : 'rounded-sm')}
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <PageSlot
                      page={pages[leaf.frontPageIndex]}
                      pageNumber={leaf.frontPageIndex + 1}
                      side="right"
                    />
                  </div>

                  {spread ? (
                    <div
                      className="absolute inset-0 overflow-hidden rounded-l-sm"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    >
                      {leaf.backPageIndex !== null ? (
                        <PageSlot page={pages[leaf.backPageIndex]} pageNumber={leaf.backPageIndex + 1} side="left" />
                      ) : (
                        <div className="h-full w-full bg-muted" />
                      )}
                    </div>
                  ) : (
                    <div
                      className="absolute inset-0 rounded-sm bg-muted"
                      style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                      aria-hidden
                    />
                  )}
                </div>
              )
            })}

            <button
              type="button"
              onClick={goPrev}
              disabled={isAtStart}
              aria-label="Página anterior"
              className="absolute inset-y-0 left-0 w-1/2 cursor-w-resize disabled:cursor-default"
              style={{ zIndex: numLeaves + 10 }}
            />
            <button
              type="button"
              onClick={goNext}
              disabled={isAtEnd}
              aria-label="Página siguiente"
              className="absolute inset-y-0 right-0 w-1/2 cursor-e-resize disabled:cursor-default"
              style={{ zIndex: numLeaves + 10 }}
            />
          </div>
        </div>

        {/* Botón siguiente */}
        <button
          type="button"
          onClick={goNext}
          disabled={isAtEnd}
          aria-label="Página siguiente"
          className={cn(
            'flex size-10 shrink-0 items-center justify-center rounded-full border transition-all duration-200 sm:size-11',
            'border-[#C9A44A]/40 bg-white/5 text-[#A8B4C0] backdrop-blur-sm',
            'hover:border-[#C9A44A] hover:bg-[#C9A44A] hover:text-[#0a1225] hover:shadow-[0_0_16px_rgba(201,164,74,0.4)]',
            'disabled:cursor-not-allowed disabled:opacity-25 disabled:hover:bg-white/5 disabled:hover:border-[#C9A44A]/40 disabled:hover:text-[#A8B4C0] disabled:hover:shadow-none',
          )}
        >
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>

      {/* Indicador de página */}
      <p
        className="text-[11px] tracking-[0.15em] uppercase text-[#A8B4C0]/70"
        aria-live="polite"
      >
        {indicatorText}
      </p>

      {/* Panel de miniaturas */}
      <div className="w-full max-w-3xl overflow-hidden rounded-lg border border-[#C9A44A]/20 bg-[#0f1b40] shadow-[0_4px_24px_rgba(7,13,31,0.5)]">
        <Thumbnails activeIndex={activeIndex} onSelect={goToPageIndex} />
      </div>
    </div>
  )
}
