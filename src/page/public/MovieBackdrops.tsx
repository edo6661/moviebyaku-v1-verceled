import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
import { useParams } from "react-router-dom";
import ErrorMessage from "../../components/errAndLoading/TemporaryError";
import { useImagesMovieQuery } from "../../features/movie/movieApiSlice";
import baseImageUrl from '../../utils/baseImgUrl';

countries.registerLocale(english);

const MovieBackdrops = () => {

    const { id } = useParams()
    const { data, isError, error,
        // isLoading
    } = useImagesMovieQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />
    console.log(data)

    return (
        <section className="containerSubSingleMovie">

            <article className="containerAlterSingleMovie grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-0">
                {errMsg}
                {data?.backdrops.map((backdrop, i) => {
                    return (
                        <div key={i}>
                            <img className=''
                                src={baseImageUrl + backdrop.file_path} alt={i.toString()} />
                        </div>
                    )
                })}
            </article>
        </section>
    )
}

export default MovieBackdrops