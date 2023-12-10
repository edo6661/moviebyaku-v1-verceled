import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../components/errAndLoading/TemporaryError';
import { usePopularPeopleQuery } from "../../features/people/peopleApiSlice";
import baseImageUrl from '../../utils/baseImgUrl';

const PopularPeople = () => {
    const [page, setPage] = useState(1);
    const [allPeople, setAllPeople] = useState<PersonSearchResult[]>([])
    const { data, isError, error, isLoading } = usePopularPeopleQuery(page.toString())

    const errMsg = isError && error && <ErrorMessage error={error} />

    useEffect(() => {
        if (data?.results.length) {
            setAllPeople(prev => [...prev, ...data.results])
        }
    }, [data])

    const nextSlide = () => setPage(prev => prev + 1)

    if (isError) {
        return errMsg
    }


    return (
        <section className="mt-[4.5rem]">
            <article className="casualWrapper my-6">
                {errMsg}
                <h1 className='font-bold mb-4 text-2xl'>Popular People</h1>
                <div className='containerPopularPeople'>
                    {data?.results.length ? allPeople.map((person) => {

                        return (
                            <div key={person.id}
                                className='innerPopularPeople'>
                                <Link to={`/person/${person.id}`}>
                                    <img src={baseImageUrl + person.profile_path} alt={person.name}
                                        className='' />

                                </Link>
                                <div className='detailsPopularPeople'>
                                    <p className='font-semibold text-lg'>{person.name}</p>
                                    <div>
                                        {person.known_for.map((k, i, a) => {
                                            return (
                                                <span key={k.id}
                                                    className='dateSingleMovie font-normal dark:text-white text-black'>
                                                    {(i === a.length - 1 && a.length > 1) ? ', and ' : ''}
                                                    {k.original_name}
                                                    {k.original_title}
                                                    {/* ! kalo dia bukan 2 element terakhir ga kasih koma, tapi kasih koma ke element pertama */}
                                                    {(i < a.length - 2 ? ', ' : '')}
                                                </span>
                                            )
                                        })}
                                    </div>

                                </div>
                            </div>
                        )
                    }) : !isLoading && <h2 className='text-3xl font-bold text-center'>No Popular People</h2>}

                    {!isLoading && allPeople.length ? (
                        <button className=" buttonShowMore"
                            onClick={nextSlide}>
                            Show more
                        </button>
                    ) : ''}

                </div>
            </article>
        </section>
    )
}

export default PopularPeople