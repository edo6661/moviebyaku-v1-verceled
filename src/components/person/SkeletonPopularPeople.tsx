import Skeleton from "react-loading-skeleton"

const SkeletonPopularPeople = () => {
    return (
        Array.from({ length: 20 }).map((_, i) => {
            return (
                <div key={i}>
                    <Skeleton duration={2} className='skeleton h-[19.25rem] rounded-b-none ' count={1} />
                    <Skeleton duration={2} className='skeleton  ' count={1} />
                    <Skeleton duration={2} className='skeleton w-1/2  ' count={1} />
                </div>
            )
        })
    )
}

export default SkeletonPopularPeople