import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import { useReviewsMovieQuery } from "../../features/movie/movieApiSlice";
import baseImageUrl from "../../utils/baseImgUrl";
import ErrorMessage from "../errAndLoading/TemporaryError";

const ReviewsSection = ({ id }: { id: string }) => {
    const { data, isError, error, isLoading } = useReviewsMovieQuery(id);

    const errMsg = isError && error && <ErrorMessage error={error} />

    const [rest, setRest] = useState(false)

    if (isError) {
        return errMsg
    }


    return (
        <>
            <div className="containerSingleMovieReview">
                {!isError && !isLoading && data?.results.length ? <p className=" headersSingleMovie">Reviews <span className=" text-myWhite opacity-80">{data?.results.length}</span></p> : <p className="headersSingleMovie ">Empty Reviews</p>}
            </div>
            {data?.results.length ? data?.results.filter(review => review.author_details.avatar_path !== null).slice(0, 1).map((review) => {
                return (
                    <div key={review.id} className="  innerSingleMovieReview">
                        <div className="detailsSingleMovieReview">
                            <div>
                                <img src={`${baseImageUrl}${review.author_details.avatar_path}`} alt={review.author} />
                            </div>
                            <div>
                                <p className=" font-semibold">
                                    {review.author}
                                </p>
                                <div className="secondDetailsSingleMovieReviews gap-3">
                                    <div className="secondDetailsSingleMovieReviews gap-1">
                                        {review.author_details.rating && (
                                            <>
                                                <p>{<FaStar />}</p>
                                                <p>{review.author_details.rating}</p>
                                            </>
                                        )}
                                    </div>
                                    <p className="dateSingleMovie">on {new Date(review.created_at.split('T')[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                        <div className="m-3">
                            <p className="lg:text-lg text-base">
                                {!rest && review.content.length > 400 ? review.content.slice(0, 400) + '...' : review.content}
                            </p>
                            <div className='flex my-2 gap-2'>
                                {review.content.length > 400 && <button className="lg:text-lg text-base font-semibold" onClick={() => setRest(prev => !prev)}>{rest ? 'Show Less' : 'Show More'}</button>
                                }
                            </div>
                        </div>

                    </div>
                )
            }) : null}
        </>
    )
}

export default ReviewsSection