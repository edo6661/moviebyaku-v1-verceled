import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
import { useParams } from "react-router-dom";
import ErrorMessage from '../../../components/errAndLoading/TemporaryError';
import { useImagesTvQuery } from '../../../features/tv/tvApiSlice';
import baseImageUrl from '../../../utils/baseImgUrl';

countries.registerLocale(english);

const TvBackdrops = () => {

    const { id } = useParams()
    const { data, isError, error,
        isLoading
    } = useImagesTvQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />
    if (isError) {
        return errMsg
    }

    return (
        <section className="containerSubSingleMovie">

            <article className="containerAlterSingleMovie grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-0">
                {errMsg}
                {data?.backdrops.length ? data?.backdrops.slice(0, 25).map((backdrop, i) => {
                    return (
                        <div key={i}>
                            <img className=''
                                src={baseImageUrl + backdrop.file_path} alt={i.toString()} />
                        </div>
                    )
                }) : !isLoading && <h2 className='text-3xl font-bold text-center'>No Backdrops</h2>}
            </article>
        </section>
    )
}

export default TvBackdrops