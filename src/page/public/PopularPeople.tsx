import { useEffect, useState } from 'react';
import ErrorMessage from '../../components/errAndLoading/TemporaryError';
import PersonCard from '../../components/person/PersonCard';
import SkeletonPopularPeople from '../../components/person/SkeletonPopularPeople';
import { usePopularPeopleQuery } from "../../features/people/peopleApiSlice";

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
                    {!isLoading ? data?.results.length ? allPeople.map((person) => {
                        return <PersonCard person={person} />
                    }) : !isLoading && <h2 className='text-3xl font-bold text-center'>No Popular People</h2>
                        : <SkeletonPopularPeople />}

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