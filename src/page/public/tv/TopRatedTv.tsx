import { useEffect, useState } from 'react';
import ErrorMessage from '../../../components/errAndLoading/TemporaryError';
import NavTvs from '../../../components/tv/NavTvs';
import { useTopRatedTvQuery } from '../../../features/tv/tvApiSlice';
import { sortingDropdownStuff } from '../../../utils/SortDropdownVars';

const TopRatedTv = () => {
    const [page, setPage] = useState(1)
    const [button, setButton] = useState<Record<string, boolean>>({})
    const [svg, setSvg] = useState(false)
    const [dropdown, setDropdown] = useState(false)
    const [allMovies, setAllMovies] = useState<PopularTv[]>([])
    const { data, isError, error, isLoading } = useTopRatedTvQuery(page);

    const errMsg = (error && isError) ? <ErrorMessage error={error} /> : null;

    useEffect(() => {
        if (data?.results) {
            setAllMovies(prev => [...prev, ...data.results])
        }
    }, [data])

    const nextPage = () => setPage(prev => prev + 1)
    const handleSvg = () => setSvg(prev => !prev)
    const handleDropdown = () => setDropdown(prev => !prev)
    const handleClick = (i: number) => setButton(prev => ({ ...prev, [i]: !(prev[i] || false) }))

    useEffect(() => {
        if (!svg) {
            setDropdown(false)
        }
    }, [svg, dropdown])

    if (isError) {
        return errMsg
    }


    return <NavTvs
        title="Toprated Tv"
        errMsg={errMsg ?? undefined}
        data={data}
        allMovies={allMovies}
        button={button}
        handleClick={handleClick}
        isLoading={isLoading}
        nextPage={nextPage}
        svg={svg}
        handleDropdown={handleDropdown}
        dropdown={dropdown}
        handleSvg={handleSvg}
        sortingDropdownStuff={sortingDropdownStuff}
    />
}

export default TopRatedTv