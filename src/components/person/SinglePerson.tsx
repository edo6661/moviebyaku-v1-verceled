import { useParams } from 'react-router-dom';
import { usePersonByIdQuery } from '../../features/people/peopleApiSlice';
import useTitle from '../../hooks/useTitle';
import ErrorMessage from '../errAndLoading/TemporaryError';
import FirstSectionSinglePerson from './FirstSectionSinglePerson';
const SinglePerson = () => {
    const { id } = useParams()
    const { data, isLoading, isError, error } = usePersonByIdQuery(id ?? '')
    useTitle(data?.name ?? 'Loading...')
    const errMsg = isError && error && <ErrorMessage error={error} />

    if (isLoading) return <h1>Temporary loading nanti dibenerin puh...`</h1>


    if (isError) {
        return errMsg
    }

    return (
        <>
            {errMsg}
            <section className='containerSingleMovie overflow-x-hidden ' >
                {data && <FirstSectionSinglePerson {...data} />}
            </section>
            <section className='containerSingleMovie casualWrapper my-8 '>
                {/* <SecondSectionSingleTv id={id ?? ''} status={data?.status ?? ''} original_language={data?.original_language ?? ''} type={data?.type ?? ''} /> */}
            </section>
        </>
    )
}

export default SinglePerson