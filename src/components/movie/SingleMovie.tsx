import { useParams } from 'react-router-dom';
import { useMovieByIdQuery } from '../../features/movie/movieApiSlice';
import useTitle from '../../hooks/useTitle';

const SingleMovie = () => {
    const { id } = useParams()
    const { data, isLoading } = useMovieByIdQuery(id ?? '')
    useTitle(data?.title ?? 'Loading...')

    if (isLoading) return <h1>loading...</h1>
    console.log(data)

    return (
        <article>
            singleMovie {id}
        </article>
    )
}

export default SingleMovie