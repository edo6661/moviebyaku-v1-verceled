import { useState } from "react";
import { useParams } from 'react-router-dom';
import ErrorMessage from "../../components/errAndLoading/TemporaryError";
import MediaList from "../../components/searchPage/MediaList";
import TitleCountSearch from "../../components/searchPage/TitleCountSearch";
import { useSearchMovieQuery, useSearchMultiQuery, useSearchTvQuery } from "../../features/search/searchApiSlice";
const SearchPage = () => {
    const { keyword } = useParams();

    const [page, setPage] = useState("1")
    const [type, setType] = useState("Multi")

    const tv = type === "Shows";
    const movie = type === "Movie";
    const multi = type === "Multi";

    const handleType = (title: string) => {
        setPage("1")
        setType(title)
    }
    const handlePage = (i: string) => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setPage(i)
    }

    const { data, isError, error, } = useSearchMultiQuery({ query: keyword ?? '', page: page })
    const { data: movies, isError: isErrM, error: err } = useSearchMovieQuery({ query: keyword ?? '', page: page })
    const { data: tvs, isError: isErrT, error: errT } = useSearchTvQuery({ query: keyword ?? '', page: page })

    if (isError) {
        return <ErrorMessage error={error} />
    }
    if (isErrM) {
        return <ErrorMessage error={err} />
    }
    if (isErrT) {
        return <ErrorMessage error={errT} />
    }

    return (
        <section className="mt-[4.5rem]">
            <article className="casualWrapper my-6">
                <div className="containerMediaLinks">
                    <div className=" sm:col-span-1 col-span-2">
                        <div className='containerSorting '>
                            <div className='containerSearchPage' >
                                <h2  >Search Results</h2>
                            </div>
                            <div className=" flex flex-col ">
                                <TitleCountSearch type={type} title="Multi" total={data?.total_results} handleType={handleType} />
                                <TitleCountSearch type={type} title="Movie" total={movies?.total_results} handleType={handleType} />
                                <TitleCountSearch type={type} title="Shows" total={tvs?.total_results} handleType={handleType} />
                            </div>
                        </div>
                    </div>
                    {multi && <MediaList data={data} page={page} handlePage={handlePage} />}
                    {movie && <MediaList data={movies} page={page} handlePage={handlePage} />}
                    {tv && <MediaList data={tvs} page={page} handlePage={handlePage} />}

                </div>
            </article>
        </section>
    )
}

export default SearchPage