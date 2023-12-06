import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Flag from 'react-world-flags';
import ErrorMessage from '../../../components/errAndLoading/TemporaryError';
import { useAlterTitleTvQuery } from '../../../features/tv/tvApiSlice';

countries.registerLocale(english);

const TvAlterTitle = () => {
    const { id } = useParams()
    const { data, isError, error, isLoading } = useAlterTitleTvQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />

    const [countryCounts, setCountryCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const counts: Record<string, number> = {}
        data?.results.map((title) => {
            // ! ini meriksa apa udah ada key di variable counts. kalo gada hitungan diatur ke 0. terus hitungan untuk negara ini ditingkatkan sebanyak 1.
            if (!counts[title.iso_3166_1]) {
                counts[title.iso_3166_1] = 0;
            }
            counts[title.iso_3166_1]++;
        });
        setCountryCounts(counts);
    }, [data]);

    if (isError) {
        return errMsg
    }

    return (
        <section className="containerSubSingleMovie">
            {errMsg}
            {data?.results.length ? !isLoading && (
                <article className="containerAlterSingleMovie">
                    <div className="mb-8">
                        <div className="innerAlterSingleMovie">
                            <div className=' detailsAlterSingleMovie'>
                                <h2 >Alter Title </h2>
                            </div>
                            <div className=''>
                                <p className="detailsNumberAlter">{data?.results.length}</p>
                            </div>
                        </div>
                        {data?.results.length ? data?.results.map((title, i) => {
                            const countryName = countries.getName(title.iso_3166_1, 'en', { select: 'official' });
                            const scroller = () => {
                                if (title && title.iso_3166_1) {
                                    const element = document.getElementById(title.iso_3166_1);
                                    if (element) {
                                        const y = element.getBoundingClientRect().top + window.scrollY - 73;
                                        window.scrollTo({ top: y, behavior: "smooth" });
                                    }
                                }
                            }
                            return (
                                <div key={i} className="secondContainerAlterSingleMovie" onClick={scroller} >
                                    <p className="  col-span-2 ">{countryName}</p>
                                    <p className="detailsNumberAlter dark:text-white text-black">{countryCounts[title.iso_3166_1]}</p>
                                </div>
                            )
                        }) : <h2 className='text-3xl font-bold text-center'>No Videos</h2>}
                    </div>
                    <div className=" secondDetailsAlterSingleMovie">
                        {data?.results.length && data?.results.map((title, i) => {
                            return (
                                <div key={i} className='grid grid-cols-2' id={title.iso_3166_1} >
                                    <div className=' thirdDetailsAlterSingleMovie'>
                                        <Flag code={title.iso_3166_1} className=" w-7" />
                                        <p className=' font-semibold text-white'>{countries.getName(title.iso_3166_1, 'en', { select: 'official' })}</p>
                                    </div>
                                    <div className=' fourthDetailsAlterSingleAnime '>
                                        <p>Title</p>
                                        <p>Type</p>
                                    </div>
                                    <div className=' fifthDetailsAlterSingleAnime'>
                                        <p>{title.title}</p>
                                        <p>{title.type ?? ''}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </article>
            ) : !isLoading && <h2 className='text-3xl font-bold text-center'>No Alter Title</h2>}
        </section>
    )
}

export default TvAlterTitle