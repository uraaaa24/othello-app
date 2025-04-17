import Board from '@/components/board'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-12">
        <Board />
      </div>
    </main>
  )
}
