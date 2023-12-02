import { useRecomsMovieQuery } from "../../features/movie/movieApiSlice"

const RecomsMovie = ({ id }: { id: string }) => {

    const { data, isError, error } = useRecomsMovieQuery(id)
    console.log(data)

    return (
        <div>RecomsMovie</div>
    )
}

export default RecomsMovie