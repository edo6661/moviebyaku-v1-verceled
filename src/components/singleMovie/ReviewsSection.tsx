import { FaStar } from "react-icons/fa";
import { useReviewsMovieQuery } from "../../features/movie/movieApiSlice";
import ErrorMessage from "../errAndLoading/TemporaryError";

const ReviewsSection = ({ id }: { id: string }) => {
    const { data, isError, error } = useReviewsMovieQuery(id);


    const errMsg = isError && error && <ErrorMessage error={error} />


    return (
        <>
            {errMsg}
            <div className="flex items-center mb-3 gap-4">
                <p>Social</p>
                <button className="">Reviews <span className=" text-myWhite opacity-80">{data?.results.length}</span></button>
            </div>
            {data?.results.filter(review => review.author_details.avatar_path !== null).slice(0, 1).map((review) => {
                return (
                    <div key={review.id} className="  shadow-inner dark:shadow-darkBlue shadow-lightBlue rounded-xl flex flex-col">
                        <div className="flex m-3 gap-6">
                            <div>
                                <img className=" w-16 h-16 rounded-full" src={`https://image.tmdb.org/t/p/original${review.author_details.avatar_path}`} alt={review.author} />
                            </div>
                            <div>
                                <p className=" font-semibold">
                                    {review.author}
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1">
                                        <p>{<FaStar />}</p>
                                        <p>{review.author_details.rating}.0</p>
                                    </div>
                                    <p className="text-myWhite opacity-80 font-light">on {new Date(review.created_at.split('T')[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                        <div className="m-3">
                            <p className=" lg:text-lg text-base">
                                {review.content.length > 400 ? review.content.slice(0, 400) + '...' : review.content}
                            </p>
                            <button className="lg:text-lg text-base font-semibold">Read rest</button>
                        </div>

                    </div>
                )
            })}
        </>
    )
}

export default ReviewsSection