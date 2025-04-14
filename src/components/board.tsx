const Board = () => {
    return (
        <div className="grid grid-cols-8 grid-rows-8 gap-0.5 border-2 border-neutral-800 bg-[var(--board-green)]">
            {Array.from({ length: 64 }).map((_, i) => (
                <div
                    key={i}
                    className="w-12 h-12 bg-green-700 hover:bg-green-600 transition-colors"
                />
            ))}
        </div>
    )
}

export default Board
