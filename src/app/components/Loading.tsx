
export function SkeletonCard() {
    return (
        <div
            className="
    sm:w-[250px]
    sm:h-[250px]
    w-full
    h-96
    rounded-lg
    bg-gradient-to-br
    from-gray-400
    via-gray-200
    to-gray-400
    animate-[shimmer_3s_infinite_alternate]
  "
        />
    )
}


export default function SkeletonCardDeck() {
    return <div className="mx-auto max-w-6xl p-2 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 place-items-center ">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
    </div>
}