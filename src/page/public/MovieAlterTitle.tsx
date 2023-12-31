import countries from 'i18n-iso-countries';
import english from 'i18n-iso-countries/langs/en.json';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import Flag from 'react-world-flags';
import ErrorMessage from "../../components/errAndLoading/TemporaryError";
import { useAlterTitleMovieQuery } from "../../features/movie/movieApiSlice";

countries.registerLocale(english);

const MovieAlterTitle = () => {
    const { id } = useParams()
    const { data, isError, error, isLoading } = useAlterTitleMovieQuery(id ?? '')
    const errMsg = isError && error && <ErrorMessage error={error} />

    const [countryCounts, setCountryCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const counts: Record<string, number> = {}
        data?.titles.map((title) => {
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
    //! memakai new Set karena Objek Set hanya menyimpan nilai unik jadi akan menghapus duplikasi , dan array.from itu untuk menjadikannya sebagai array
    const uniqueCountries = Array.from(new Set(data?.titles.map(title => countries.getName(title.iso_3166_1, 'en', { select: 'official' }))));

    return (
        <section className="containerSubSingleMovie">
            {errMsg}
            {data?.titles.length ? !isLoading && (
                <article className="containerAlterSingleMovie">
                    <div className="mb-8">
                        <div className="innerAlterSingleMovie">
                            <div className=' detailsAlterSingleMovie'>
                                <h2 >Alter Title </h2>
                            </div>
                            <div className=''>
                                <p className="detailsNumberAlter">{data?.titles.length}</p>
                            </div>
                        </div>

                        {data?.titles.length ? uniqueCountries.map((countryName, i) => {

                            //! nyari judul yang sama di array data.titles tanpa duplikat karena mencari iso yang sama doang jika ada iso yang sama tidak akan di ambil, hanya akan diambil yang pertama doang menghindari duplikat
                            const title = data?.titles.find(title => countries.getName(title.iso_3166_1, 'en', { select: 'official' }) === countryName);

                            if (!title) {
                                return null;
                            }

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
                                    {/* ! nyari iso pake variable titles agar ga duplikat nama negaranya */}
                                    <p className="detailsNumberAlter dark:text-white text-black">{countryCounts[title.iso_3166_1]}</p>
                                </div>
                            )
                        }) : <h2 className='text-3xl font-bold text-center'>No Alter Title</h2>}
                    </div>
                    <div className=" secondDetailsAlterSingleMovie">
                        {data?.titles.length && data?.titles.map((title, i) => {
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

export default MovieAlterTitle