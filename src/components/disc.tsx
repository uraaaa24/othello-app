'use client'

type DiscProps = {
  color: 'black' | 'white'
}

const Disc = ({ color }: DiscProps) => {
  return (
    <div
      className={`
      w-12 h-12 rounded-full
      ${color === 'black' ? 'bg-gray-800' : 'bg-white'}
      `}
    />
  )
}

export default Disc
