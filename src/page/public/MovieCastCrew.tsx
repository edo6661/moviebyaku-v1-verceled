import { useParams } from "react-router-dom"
import ErrorMessage from "../../components/errAndLoading/TemporaryError"
import { useCreditsMovieQuery } from "../../features/movie/movieApiSlice"
import useWindowWidth from "../../hooks/useWindowWidth"
import baseImageUrl from "../../utils/baseImgUrl"

const MovieCastCrew = () => {
    const width = useWindowWidth()
    const { id } = useParams()
    const { data, isError, error,
        // isLoading
    } = useCreditsMovieQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />
    console.log(data)

    const title = width > 640 ? (
        <>
            <div>
                <h2 className="dark:text-white text-black font-semibold">Cast <span className="detailsNumberAlter">{data?.cast.length}</span></h2>
            </div>
            <div>
                <h3 className="dark:text-white text-black font-semibold">Crew <span className="detailsNumberAlter">{data?.crew.length}</span></h3>
            </div>

        </>
    ) : (
        <div>
            <h2 className="dark:text-white text-black font-semibold">Cast <span className="detailsNumberAlter">{data?.cast.length}</span></h2>
        </div>
    )

    const smTitle = width < 640 && (
        <div>
            <h3 className="text-white font-semibold">Crew <span className="detailsNumberAlter">{data?.crew.length}</span></h3>
        </div>
    )


    return (
        <section className="containerSubSingleMovie  ">
            {errMsg}
            <article className="grid sm:grid-cols-2 gap-5 casualWrapper">
                {title}
                <div className="flex flex-col gap-6 ">
                    {data?.cast.map((cast, i) => {
                        return (
                            <div key={i} className="flex gap-4 shadow-inner dark:shadow-darkBlue shadow-lightBlue rounded-xl">
                                <img className=" w-20 rounded-xl" src={baseImageUrl + cast.profile_path} alt={cast.name} />
                                <div className="flex flex-col mt-2">
                                    <p className=" font-semibold dark:text-white text-black">{cast.name}</p>
                                    <p className="detailsNumberAlter text-start">{cast.known_for_department}</p>
                                </div>
                            </div>
                        )
                    })}
                    {smTitle}
                </div>
                <div className="flex flex-col gap-6">
                    {data?.crew.map((crew, i) => {
                        return (
                            <div key={i} className="flex gap-4 shadow-inner dark:shadow-darkBlue shadow-lightBlue rounded-xl">
                                <img className=" w-20 rounded-xl" src={baseImageUrl + crew.profile_path} alt={crew.name} />
                                <div className="flex flex-col mt-2">
                                    <p className=" font-semibold dark:text-white text-black">{crew.name}</p>
                                    <p className="detailsNumberAlter text-start">{crew.known_for_department}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </article>
        </section>
    )
}

export default MovieCastCrew