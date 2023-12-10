import SortingDropdown from '../SortingDropdown';
import GenreButton from '../movie/GenreButton';
import SkeletonGenre from '../movie/SkeletonGenre';
import SkeletonNav from '../movie/SkeletonNav';
import TvsCard from './TvsCard';

interface Props {
    title: string;
    errMsg: JSX.Element | undefined;
    data: PopularTvResult | undefined;
    allMovies: PopularTv[];
    button: Record<string, boolean>;
    handleClick: (i: number) => void;
    isLoading: boolean;
    nextPage: () => void;
    svg: boolean;
    handleDropdown: () => void;
    dropdown: boolean;
    handleSvg: () => void;
    sortingDropdownStuff: string[];
    handleSort: (s: string) => void;
    sort: string;
    genres?: Genre[] | undefined;
    handleActiveGenre: (id: string) => void;
    isActiveGenre: Record<string, boolean>;
    loadingGenre: boolean

}
const NavTvs = ({ title, errMsg, data, allMovies, button, handleClick, isLoading, nextPage, svg, handleDropdown, dropdown, handleSvg, sortingDropdownStuff, handleSort, sort, genres, isActiveGenre, handleActiveGenre, loadingGenre }: Props) => {
    const elementTvs = <div className=" detailsMediaLinks">
        {!isLoading ? data?.results.length ? allMovies.map((tv, i) => (
            <TvsCard key={tv.id} tv={tv} i={i} button={button} handleClick={handleClick} />
        )) : !isLoading && <h2 className='text-3xl font-bold text-center'>No {title}</h2>
            : <SkeletonNav />}

        {!isLoading && allMovies.length > 0 && allMovies.length % 20 === 0 ? (
            <button className=" buttonShowMore"
                onClick={nextPage}>
                Show more
            </button>
        ) : ''}
    </div>

    const sortingAndGenres = <div className="innerMediaLinks">
        <SortingDropdown handleSort={handleSort} svg={svg} handleDropdown={handleDropdown} dropdown={dropdown} sort={sort} handleSvg={handleSvg} title='Sort' stuff={sortingDropdownStuff} />
        <p className='text-lg font-semibold ml-1'>Genres</p>
        <div className='flex flex-wrap gap-2'>
        {!loadingGenre ? genres?.map((genre) => (
                <GenreButton key={genre.id} genre={genre} isActiveGenre={isActiveGenre} handleActiveGenre={handleActiveGenre} />
            )) : <SkeletonGenre />}
        </div>
    </div>

    return (
        <section className="mt-[4.5rem]">
            <article className="casualWrapper my-6">
                <h1 className="font-bold mb-4 text-2xl">{title}</h1>
                {errMsg}
                <div className="containerMediaLinks">
                    {sortingAndGenres}
                    {elementTvs}
                </div>
            </article >
        </section >
    );
};

export default NavTvs;
