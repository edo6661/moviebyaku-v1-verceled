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
    console.log(data)

    const [countryCounts, setCountryCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        const counts: Record<string, number> = {}
        data?.titles.map((title) => {
            if (!counts[title.iso_3166_1]) {
                counts[title.iso_3166_1] = 0;
            }
            counts[title.iso_3166_1]++;
        });
        setCountryCounts(counts);
    }, [data]);

    // ! terahir

    return (
        <section className="containerSubSingleMovie">
            {errMsg}
            {!isLoading && (
                <article className="sm:grid sm:grid-cols-3 gap-8 casualWrapper p-0">
                    <div className="mb-8">
                        <div className="grid grid-cols-4 justify-between gap-4 dark:bgDarkGradient bgLightGradient px-6 py-4 rounded-t-xl items-center">
                            <div className=' col-span-3 text-white font-semibold'>
                                <h2 >Alternative Titles </h2>
                            </div>
                            <div className=''>
                                <p className="fadeWord text-end">{data?.titles.length}</p>
                            </div>
                        </div>
                        {data?.titles.map((title, i) => {
                            const countryName = countries.getName(title.iso_3166_1, 'en', { select: 'official' });
                            const scroller = () => {
                                if (title && title.iso_3166_1) {
                                    const element = document.getElementById(title.iso_3166_1);
                                    if (element) {
                                        element.scrollIntoView({ behavior: "smooth" });
                                    }
                                }
                            }
                            return (
                                <div key={i} className="grid grid-cols-3 justify-between gap-4  px-6 py-4  items-center shadowButtonImgSliderMedia dark:text-white text-black cursor-pointer hover:opacity-60 hover:blur-[1px] transition-all duration-150" onClick={scroller} >
                                    <p className="  col-span-2 ">{countryName}</p>
                                    <p className="fadeWord text-end dark:text-white text-black">{countryCounts[title.iso_3166_1]}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div className=" col-span-2 flex flex-col gap-8">
                        {data?.titles.map((title) => {
                            return (
                                <div className='grid grid-cols-2' id={title.iso_3166_1} >
                                    <div className=' col-span-2 flex dark:bgDarkGradient bgLightGradient px-6 py-4 rounded-t-xl items-center gap-4'>
                                        <Flag code={title.iso_3166_1} className=" w-7" />
                                        <p className=' font-semibold text-white'>{countries.getName(title.iso_3166_1, 'en', { select: 'official' })}</p>
                                    </div>
                                    <div className=' grid grid-cols-2 col-span-2 px-6 py-4 font-semibold dark:text-white text-black '>
                                        <p>Title</p>
                                        <p>Type</p>
                                    </div>
                                    <div className=' grid grid-cols-2 col-span-2 px-6 py-4 shadow-inner dark:shadow-darkBlue shadow-lightBlue dark:text-white text-black'>
                                        <p>{title.title}</p>
                                        <p>{title.type ?? ''}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </article>
            )}
        </section>
    )
}

export default MovieAlterTitle