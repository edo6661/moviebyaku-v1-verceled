import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Flag from 'react-world-flags';
import ErrorMessage from "../../components/errAndLoading/TemporaryError";
import { useReleaseDatesQuery } from "../../features/movie/movieApiSlice";
import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(english);

const MovieRelease = () => {
    const { id } = useParams()
    const { data, isError, error, isLoading } = useReleaseDatesQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />
    console.log(data)
    const [countryCounts, setCountryCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const counts: Record<string, number> = {}
        data?.results.forEach((release) => {
            // ! ini meriksa apa udah ada key di variable counts. kalo gada hitungan diatur ke 0. terus hitungan untuk negara ini ditingkatkan sebanyak 1.
            if (!counts[release.iso_3166_1]) {
                counts[release.iso_3166_1] = 0;
            }
            counts[release.iso_3166_1]++;
        });
        setCountryCounts(counts);
    }, [data]);

    // ! terahir

    return (
        <section className="containerSubSingleMovie">
            {errMsg}
            {!isLoading && (
                <article className="containerAlterSingleMovie">
                    <div className="mb-8">
                        <div className="innerAlterSingleMovie">
                            <div className=' detailsAlterSingleMovie'>
                                <h2>Release </h2>
                            </div>
                            <div className=''>
                                <p className="detailsNumberAlter">{data?.results.length}</p>
                            </div>
                        </div>
                        {data?.results.map((release, i) => {
                            const countryName = countries.getName(release.iso_3166_1, 'en', { select: 'official' });
                            const scroller = () => {
                                if (release && release.iso_3166_1) {
                                    const element = document.getElementById(release.iso_3166_1);
                                    if (element) {
                                        // ! getBoundingClientRect().top memberikan posisi elemen relatif terhadap viewport
                                        const y = element.getBoundingClientRect().top + window.scrollY - 73;
                                        window.scrollTo({ top: y, behavior: 'smooth' });
                                    }
                                }
                            }
                            return (
                                <div key={i} className="secondContainerAlterSingleMovie" onClick={scroller} >
                                    <p className="  col-span-2 ">{countryName}</p>
                                    <p className="detailsNumberAlter dark:text-white text-black">{countryCounts[release.iso_3166_1]}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className=" secondDetailsAlterSingleMovie">
                        {data?.results.map((release, i) => {
                            return (
                                <div key={i} className='grid grid-cols-2' id={release.iso_3166_1} >
                                    <div className=' thirdDetailsAlterSingleMovie'>
                                        <Flag code={release.iso_3166_1} className=" w-7" />
                                        <p className=' font-semibold text-white'>{countries.getName(release.iso_3166_1, 'en', { select: 'official' })}</p>
                                    </div>
                                    <div className=' detailsReleaseSingleAnime font-semibold dark:text-white text-black  '>
                                        <p className='text-start'>Date</p>
                                        <p>Certi</p>
                                        <p>Type</p>
                                        <p className='text-end'>Note</p>
                                    </div>
                                    {release.release_dates.map((t, i) => {

                                        return (
                                            <div key={i} className=' detailsReleaseSingleAnime fadeWord  '>
                                                <p className='text-start'>{new Date(t.release_date).toLocaleDateString()}</p>
                                                <p>{t.certification}</p>
                                                <p>{t.type}</p>
                                                <p className='text-end'>{t.note}</p>
                                            </div>

                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                </article>
            )}
        </section>
    )
}

export default MovieRelease