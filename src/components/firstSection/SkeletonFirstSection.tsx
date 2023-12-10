import Skeleton from "react-loading-skeleton"

const SkeletonFirstSection = () => {
    return (
        <div className='flex gap-4'>
            {Array.from({ length: 8 }).map((_, i) => {
                return (
                    <div key={i}>
                        <Skeleton duration={2.5} className='sm:w-[12rem] sm:h-[288px] w-[9rem] h-[216px] skeleton ' count={1} />
                        <Skeleton duration={2.5} className='skeleton  mt-3' count={1} />
                        <Skeleton duration={2.5} className='skeleton w-1/2 ' count={1} />
                    </div>
                )
            })}
        </div>

    )
}

export default SkeletonFirstSection