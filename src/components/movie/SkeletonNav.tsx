import Skeleton from "react-loading-skeleton"

const SkeletonNav = () => {
    return (
        <div className='grid detailsMediaLinks col-span-full gap-4'>
            {Array.from({ length: 20 }).map((_, i) => {
                return (
                    <div key={i} className='relative'>
                        <Skeleton duration={2} className='skeleton h-[19.25rem] rounded-b-none ' count={1} />
                        <Skeleton duration={2} className='skeleton  absolute bottom-14 w-12 h-12 rounded-full  ' count={1} />
                        <Skeleton duration={2} className='skeleton  ' count={1} />
                        <Skeleton duration={2} className='skeleton w-1/2  ' count={1} />
                    </div>
                )
            })}
        </div>

    )
}

export default SkeletonNav