import { useParams } from "react-router-dom"
import ErrorMessage from "../../components/errAndLoading/TemporaryError"
import { useCreditsMovieQuery } from "../../features/movie/movieApiSlice"
import useWindowWidth from "../../hooks/useWindowWidth"
import baseImageUrl from "../../utils/baseImgUrl"

const MovieCastCrew = () => {
    const width = useWindowWidth()
    const { id } = useParams()
    const { data, isError, error,
        isLoading
    } = useCreditsMovieQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />

    const title = !isLoading && width > 640 ? (
        <>
            <div>
                <h2 className="dark:text-white text-black font-semibold">Cast <span className="detailsNumberAlter">{data?.cast.length}</span></h2>
            </div>
            <div>
                <h3 className="dark:text-white text-black font-semibold">Crew <span className="detailsNumberAlter">{data?.crew.length}</span></h3>
            </div>

        </>
    ) : !isLoading && (
        <div>
            <h2 className="dark:text-white text-black font-semibold">Cast <span className="detailsNumberAlter">{data?.cast.length}</span></h2>
        </div>
    )

    const smTitle = !isLoading && width < 640 && (
        <div>
            <h3 className="text-white font-semibold">Crew <span className="detailsNumberAlter">{data?.crew.length}</span></h3>
        </div>
    )
    const uniqueCrew = data?.crew.reduce((acc: typeof data.crew, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);


    if (isError) {
        return errMsg
    }

    return (
        <section className="containerSubSingleMovie  ">
            {errMsg}
            <article className="grid sm:grid-cols-2 gap-5 casualWrapper">
                {title}
                <div className="flex flex-col gap-6 ">
                    {data?.cast.length ? data?.cast.filter(cast => cast.profile_path !== null).map((cast, i) => {
                        return (
                            <div key={i} className="flex gap-4 shadowCardl
                             rounded-xl">
                                <img className=" w-20 rounded-xl" src={baseImageUrl + cast.profile_path} alt={cast.name} />
                                <div className="flex flex-col mt-2">
                                    <p className=" font-semibold dark:text-white text-black">{cast.name}</p>
                                    <p className="detailsNumberAlter text-start">{cast.known_for_department}</p>
                                </div>
                            </div>
                        )
                    }) : !isLoading && <h2 className='text-3xl font-bold text-center'>No Cast</h2>}
                    {smTitle}
                </div>
                <div className="flex flex-col gap-6">
                    {data?.crew.length && uniqueCrew && uniqueCrew.filter(crew => crew.profile_path !== null).map((crew, i) => {
                        return (
                            <div key={i} className="flex gap-4 shadowCard rounded-xl">
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