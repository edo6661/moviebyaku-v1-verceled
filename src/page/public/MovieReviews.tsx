import { useState } from 'react'
import { FaStar } from "react-icons/fa"
import { useParams } from "react-router-dom"
import ErrorMessage from "../../components/errAndLoading/TemporaryError"
import { useReviewsMovieQuery } from "../../features/movie/movieApiSlice"
import baseImageUrl from "../../utils/baseImgUrl"

const MovieReviews = () => {
    const { id } = useParams()
    const { data, isError, error,
        isLoading
    } = useReviewsMovieQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />
    console.log(data)

    const [rest, setRest] = useState<Record<number, boolean>>({})

    const handleRest = (i: number) => setRest(prev => ({ ...prev, [i]: !(prev[i] || false) }))

    if (isError) {
        return errMsg
    }


    return (
        <section className="containerSubSingleMovie">
            {errMsg}
            <article className="casualWrapper p-0">
                <div className=" grid md:grid-cols-2 ">
                    {data?.results.length ? data?.results.filter(result => result.author_details.avatar_path !== null).map((result, i) => {
                        return (
                            <div className=" shadowCard rounded-xl flex flex-col "
                                key={result.id}>
                                <div className="m-3 flex gap-6">
                                    <img className="w-16 h-16 rounded-full"
                                        src={baseImageUrl + result.author_details.avatar_path} alt={result.author} />
                                    <div className="flex flex-col">
                                        <p className=" font-semibold">
                                            {result.author}
                                        </p>
                                        <div className="secondDetailsSingleMovieReviews gap-3">
                                            {result.author_details.rating && (
                                                <div className="secondDetailsSingleMovieReviews gap-1">
                                                    <p>{<FaStar />}</p>
                                                    <p>{result.author_details.rating}</p>
                                                </div>
                                            )}
                                            <p className="dateSingleMovie">on {new Date(result.created_at.split('T')[0]).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="m-3">
                                    <p className=" lg:text-lg text-base">
                                        {rest[i] ? result.content : result.content.slice(0, 450) + '...'}
                                    </p>
                                    <div className='flex my-2 gap-2'>

                                        {result.content.length > 450 ? <button className="lg:text-lg text-base font-semibold" onClick={() => handleRest(i)}>{rest[i] ? 'Show Less' : 'Show More'}</button> : ''}
                                    </div>
                                </div>
                            </div>
                        )
                    }) : !isLoading && <h2 className='text-3xl font-bold text-center'>No Reviews</h2>}
                </div>
            </article>
        </section>
    )
}

export default MovieReviews