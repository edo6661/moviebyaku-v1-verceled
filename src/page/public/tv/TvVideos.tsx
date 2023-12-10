import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
import { useParams } from "react-router-dom";
import ErrorMessage from '../../../components/errAndLoading/TemporaryError';
import { useVideosTvQuery } from '../../../features/tv/tvApiSlice';

countries.registerLocale(english);

const TvVideos = () => {

    const { id } = useParams()
    const { data, isError, error,
        isLoading
    } = useVideosTvQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />

    if (isError) {
        return errMsg
    }


    return (
        <section className="containerSubSingleMovie">

            <article className="containerAlterSingleMovie flex flex-wrap gap-0 items-center justify-center">
                {errMsg}
                {data?.results.length ? data?.results.map((logo) => {
                    return (
                        <div className=" w-fit" key={logo.id}
                        >
                            <iframe
                                width="400"
                                height="315"
                                // src={`https://www.youtube.com/embed/${logo.key}`}
                                title={logo.name}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        </div >
                    )
                }) : !isLoading && <h2 className='text-3xl font-bold text-center'>No Videos</h2>}
            </article>
        </section>
    )
}

export default TvVideos