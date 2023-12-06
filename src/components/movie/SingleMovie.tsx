import { useParams } from 'react-router-dom';
import { useMovieByIdQuery } from '../../features/movie/movieApiSlice';
import useTitle from '../../hooks/useTitle';
import ErrorMessage from '../errAndLoading/TemporaryError';
import FirstSectionSingleMovie from '../singleMovie/FirstSectionSingleMovie';
import SecondSectionSingleMovie from '../singleMovie/SecondSectionSingleMovie';
const SingleMovie = () => {
    const { id } = useParams()
    const { data, isLoading, isError, error } = useMovieByIdQuery(id ?? '')
    useTitle(data?.title ?? 'Loading...')

    const errMsg = isError && error && <ErrorMessage error={error} />

    if (isLoading) return <h1>Temporary loading nanti dibenerin puh...`</h1>

    if (isError) {
        return errMsg
    }
    return (
        <>
            <section className='containerSingleMovie overflow-x-hidden ' >
                {data && <FirstSectionSingleMovie {...data} idParams={id ?? ''} />}
            </section>
            <section className='containerSingleMovie casualWrapper my-8 '>
                <SecondSectionSingleMovie id={id ?? ''} status={data?.status} budget={data?.budget} revenue={data?.revenue} />
            </section>
        </>
    )
}

export default SingleMovie