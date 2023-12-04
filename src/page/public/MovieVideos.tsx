import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/errAndLoading/TemporaryError";
import { useVideosMovieQuery } from "../../features/movie/movieApiSlice";

countries.registerLocale(english);

const MovieVideos = () => {

    const { id } = useParams()
    const { data, isError, error,
        // isLoading
    } = useVideosMovieQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />
    return (
        <section className="containerSubSingleMovie">

            <article className="containerAlterSingleMovie flex flex-wrap gap-0 items-center justify-center">
                {errMsg}
                {data?.results.map((logo) => {
                    return (
                        <div className=" w-fit" key={logo.id}
                        >
                            <iframe
                                width="400"
                                height="315"
                                src={`https://www.youtube.com/embed/${logo.key}`}
                                title={logo.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div >
                    )
                })}
            </article>
        </section>
    )
}

export default MovieVideos