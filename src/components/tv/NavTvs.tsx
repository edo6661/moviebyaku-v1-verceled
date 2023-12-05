import SortingDropdown from '../SortingDropdown';
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
}
const NavTvs = ({ title, errMsg, data, allMovies, button, handleClick, isLoading, nextPage, svg, handleDropdown, dropdown, handleSvg, sortingDropdownStuff }: Props) => {
    return (
        <section className="mt-[4.5rem]">
            <article className="casualWrapper my-6">
                <h1 className="font-bold mb-4 text-2xl">{title}</h1>
                {errMsg}
                <div className="containerMediaLinks">
                    <div className="innerMediaLinks">
                        <SortingDropdown svg={svg} handleDropdown={handleDropdown} dropdown={dropdown} handleSvg={handleSvg} title='Sort' stuff={sortingDropdownStuff} />
                    </div>
                    <div className=" detailsMediaLinks">
                        {data?.results ? allMovies.map((tv, i) => (
                            <TvsCard key={tv.id} tv={tv} i={i} button={button} handleClick={handleClick} />
                        )) : !isLoading && <h2 className='text-3xl font-bold text-center'>No {title}</h2>}

                        {!isLoading && allMovies.length ? (
                            <button className=" buttonShowMore"
                                onClick={nextPage}>
                                Show more
                            </button>
                        ) : ''}
                    </div>
                </div>
            </article >
        </section >
    );
};

export default NavTvs;
