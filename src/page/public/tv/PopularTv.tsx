/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import ErrorMessage from '../../../components/errAndLoading/TemporaryError';
import NavTvs from '../../../components/tv/NavTvs';
import { useGenresTvQuery, useSortTvQuery } from '../../../features/tv/tvApiSlice';
import { sortingDropdownStuff } from '../../../utils/SortDropdownVars';

const PopularMovies = () => {
    const [page, setPage] = useState(1)
    const [isSorted, setIsSorted] = useState(false)
    const [sort, setSort] = useState('popularity.desc')
    const [button, setButton] = useState<Record<string, boolean>>({})
    const [svg, setSvg] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [allMovies, setAllMovies] = useState<PopularTv[]>([])
    const [isActiveGenre, setIsActiveGenre] = useState<Record<string, boolean>>({})
    const activeGenreIds = Object.keys(isActiveGenre).filter(id => isActiveGenre[id]).join(',')

    const { data: sortData, isError: isErr, error: err, isLoading: isLoad } = useSortTvQuery({ page, sort_by: sort, genre_id: activeGenreIds })
    const { data, isError, error } = useGenresTvQuery()

    const errMsgS = (err && isErr) ? <ErrorMessage error={err} /> : null;
    const errMsg = (isError && error) ? <ErrorMessage error={error} /> : null;


    useEffect(() => {
        if (sortData?.results) {
            if (isSorted) {
                setAllMovies(Array.from(new Set(sortData.results)))
            } else {
                setAllMovies(prev => {
                    const allMovies = new Set(prev);
                    sortData.results.forEach((movie) => {
                        if (!allMovies.has(movie)) {
                            allMovies.add(movie);
                        }
                    })
                    return Array.from(allMovies)
                })
            }
        }
    }, [sortData, sort, isActiveGenre])

    const handleSort = (s: string) => {
        setSort(s)
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

    useEffect(() => {
        if (!svg) {
            setDropdown(false)
        }
    }, [svg, dropdown])

    if (isErr) {
        return errMsgS
    }
    if (isError) {
        return errMsg
    }
    return <NavTvs
        title="Popular Tv"
        errMsg={errMsgS ?? undefined}
        data={sortData}
        allMovies={allMovies}
        button={button}
        handleClick={handleClick}
        isLoading={isLoad}
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
    />
}

export default PopularMovies