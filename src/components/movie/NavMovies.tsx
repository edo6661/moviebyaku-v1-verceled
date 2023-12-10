import SortingDropdown from '../SortingDropdown';
import GenreButton from './GenreButton';
import MovieCard from './MovieCard';

interface Props {
    title: string;
    errMsg: JSX.Element | undefined;
    data: FirstSectionMovie | undefined;
    allMovies: ResultFirstSectionMovie[];
    button: Record<string, boolean>;
    handleClick: (i: number) => void;
    isLoading: boolean;
    nextPage: () => void;
    svg: boolean;
    handleDropdown: () => void;
    dropdown: boolean;
    handleSvg: () => void;
    handleSort: (s: string) => void;
    sortingDropdownStuff: string[];
    sort: string;
    genres: Genre[] | undefined;
    handleActiveGenre: (id: string) => void;
    isActiveGenre: Record<string, boolean>;
    handleTitle?: () => void
}
const NavMovies = ({ title, errMsg, data, allMovies, button, handleClick, isLoading, nextPage, svg, handleDropdown, dropdown, handleSvg, sortingDropdownStuff, sort, handleSort, genres, handleActiveGenre, isActiveGenre, handleTitle }: Props) => {


    const elementSorting = <div className="innerMediaLinks">
        <SortingDropdown sort={sort} svg={svg} handleDropdown={handleDropdown} dropdown={dropdown} handleSvg={handleSvg} title='Sort' stuff={sortingDropdownStuff} handleSort={handleSort} />
        <p className='text-lg font-semibold ml-1'>Genres</p>
        <div className='flex flex-wrap gap-2'>
            {genres?.map((genre) => (
                <GenreButton key={`movie-${genre.id}`} genre={genre} isActiveGenre={isActiveGenre} handleActiveGenre={handleActiveGenre} />
            ))}
        </div>
    </div>


    const elementMovies = <div className=" detailsMediaLinks  ">
        {!isLoading && data?.results.length ? allMovies.map((movie, i) => (
            <MovieCard key={i} movie={movie} i={i} button={button} handleClick={handleClick} />
        )) : !isLoading && <h2 className='text-3xl font-bold text-center'>No {title}</h2>}

        {!isLoading && allMovies.length > 0 && allMovies.length % 20 === 0 ? (
            <button className=" buttonShowMore h-12"
                onClick={nextPage}>
                Show more
            </button>
        ) : ''}
    </div>

    return (
        <section className="mt-[4.5rem]">
            <article className="casualWrapper my-6">
                <h1 onClick={handleTitle} className="font-bold mb-4 text-2xl cursor-pointer">{title}</h1>
                {errMsg}
                <div className="containerMediaLinks">
                    {elementSorting}
                    {elementMovies}
                </div>
            </article >
        </section >
    );
};

export default NavMovies;
