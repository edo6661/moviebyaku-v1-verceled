import Skeleton from "react-loading-skeleton"

const SkeletonGenre = () => {
    return (
        <div className='flex flex-wrap gap-4'>
            {Array.from({ length: 20 }).map((_, i) => {
                return (
                    <div key={i}>
                        <Skeleton duration={2} className='skeleton w-20 h-6 ' count={1} />
                    </div>
                )
            })}
        </div>

    )
}

export default SkeletonGenre