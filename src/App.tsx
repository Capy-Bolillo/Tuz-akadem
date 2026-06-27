import { Flipbook } from '@/components/magazine/Flipbook'

export default function App() {
  return (
    <main
      className="flex min-h-screen w-full items-center justify-center px-4 py-10"
      style={{
        background:
          'radial-gradient(ellipse 100% 65% at 50% -5%, #1B2B6B 0%, #0d1733 55%, #070d1f 100%)',
      }}
    >
      <Flipbook />
    </main>
  )
}
