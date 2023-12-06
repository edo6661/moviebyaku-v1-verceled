import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
import { useParams } from "react-router-dom";
import ErrorMessage from '../../../components/errAndLoading/TemporaryError';
import { useImagesPeopleQuery } from '../../../features/people/peopleApiSlice';
import baseImageUrl from '../../../utils/baseImgUrl';

countries.registerLocale(english);

const ProfilesPerson = () => {

    const { id } = useParams()
    const { data, isError, error,
        isLoading
    } = useImagesPeopleQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />

    if (isError) {
        return errMsg
    }

    return (
        <section className="containerSubSingleMovie">

            <article className="containerAlterSingleMovie grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-0">
                {errMsg}
                {data?.profiles.length ? data?.profiles.slice(0, 25).map((logo, i) => {
                    return (
                        <div key={i}>
                            <img className='' loading='lazy'
                                src={baseImageUrl + logo.file_path} alt={i.toString()} />
                        </div>
                    )
                }) : !isLoading && <h2 className='text-3xl font-bold text-center'>No Profile</h2>}
            </article>
        </section>
    )
}

export default ProfilesPerson