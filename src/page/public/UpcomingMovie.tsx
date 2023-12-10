import { useEffect, useState } from 'react';
import ErrorMessage from "../../components/errAndLoading/TemporaryError";
import NavMovies from '../../components/movie/NavMovies';
import { useGenresMovieQuery, useSortMovieQuery, useUpComingMoviesQuery } from "../../features/movie/movieApiSlice";
import { sortingDropdownStuff } from '../../utils/SortDropdownVars';

const UpcomingMovie = () => {
    const [page, setPage] = useState(1)
    const [sort, setSort] = useState('popularity.desc')
    const [isSorted, setIsSorted] = useState(false)
    const [button, setButton] = useState<Record<string, boolean>>({})
    const [svg, setSvg] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [allMovies, setAllMovies] = useState<ResultFirstSectionMovie[]>([])
    const [isActiveGenre, setIsActiveGenre] = useState<Record<string, boolean>>({})
    const activeGenreIds = Object.keys(isActiveGenre).filter(id => isActiveGenre[id]).join(',')


    const { data: upcomingData, isError: isErrU, error: errU, isLoading: isLoadU } = useUpComingMoviesQuery(page);
    const { data: sortData, isError: isErr, error: err } = useSortMovieQuery({ page, sort_by: sort, genre_id: activeGenreIds })
    const { data, isError, error, isLoading } = useGenresMovieQuery()

    const errMsg = (isError && error) ? <ErrorMessage error={error} /> : null;
    const errMsgS = (isErr && err) ? <ErrorMessage error={err} /> : null;
    const errMsgU = (errU && isErrU) ? <ErrorMessage error={errU} /> : null;

    const handleSort = (s: string) => {
        setSort(s);
        setIsSorted(true);
        setPage(1)
    }

    const nextPage = () => {
        setIsSorted(false);
        setPage(prev => prev + 1)
    }

    const handleSvg = () => setSvg(prev => !prev)
    const handleDropdown = () => setDropdown(prev => !prev)
    const handleClick = (i: number) => setButton(prev => ({ ...prev, [i]: !(prev[i] || false) }))
    const handleActiveGenre = (id: string) => {
        setIsSorted(true)
        setIsActiveGenre(prev => ({
            ...prev, [id]: !prev[id] || false
        }))
        setPage(1)
    }
    const handleUpcoming = () => {
        setAllMovies([])
        if (upcomingData?.results) {
            setAllMovies(prev => [...prev, ...upcomingData.results])
        }
    }

    useEffect(() => {
        setAllMovies([])
        if (upcomingData?.results) {
            setAllMovies(upcomingData.results);
        }
    }, [upcomingData]);


    useEffect(() => {
        if (sortData?.results) {

            if (isSorted) {
                setAllMovies(Array.from(new Set(sortData.results)))
            } else {
                setAllMovies(prev => {
                    const newMovies = new Set(prev);
                    sortData.results.forEach((movie) => {
                        if (!newMovies.has(movie)) {
                            newMovies.add(movie)
                        }
                    })
                    return Array.from(newMovies)
                })
            }
        }
    }, [sortData, isSorted, isActiveGenre])



    useEffect(() => {
        if (!svg) {
            setDropdown(false)
        }
    }, [svg, dropdown])

    if (isErrU) {
        return errMsgU
    }
    if (isErr) {
        return errMsgS
    }
    if (isError) {
        return errMsg
    }


    return <NavMovies
        title="Upcoming Movies"
        errMsg={errMsgU ?? undefined}
        data={upcomingData}
        allMovies={allMovies}
        button={button}
        handleClick={handleClick}
        isLoading={isLoadU}
        nextPage={nextPage}
        svg={svg}
        handleDropdown={handleDropdown}
        dropdown={dropdown}
        handleSvg={handleSvg}
        sortingDropdownStuff={sortingDropdownStuff}
        handleSort={handleSort}
        sort={sort}
        genres={data && data?.genres}
        handleActiveGenre={handleActiveGenre}
        isActiveGenre={isActiveGenre}
        handleTitle={handleUpcoming}
        loadingGenre={isLoading}
    />
}

export default UpcomingMovie