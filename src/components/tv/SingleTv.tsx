import { useParams } from 'react-router-dom';
import { useTvByIdQuery } from '../../features/tv/tvApiSlice';
import useTitle from '../../hooks/useTitle';
import ErrorMessage from '../errAndLoading/TemporaryError';
import FirstSectionSingleTv from './FirstSectionSingleTv';
import SecondSectionSingleTv from './SecondSectionSingleTv';
const SingleTv = () => {
    const { id } = useParams()
    const { data, isLoading, isError, error } = useTvByIdQuery(id ?? '')
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
                {data && <FirstSectionSingleTv {...data} idParams={id ?? ''} />}
            </section>
            <section className='containerSingleMovie casualWrapper my-8 '>
                <SecondSectionSingleTv id={id ?? ''} status={data?.status ?? ''} original_language={data?.original_language ?? ''} type={data?.type ?? ''} />
            </section>
        </>
    )
}

export default SingleTv