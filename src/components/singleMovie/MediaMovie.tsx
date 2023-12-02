import { useImagesMovieQuery, useVideosMovieQuery } from "../../features/movie/movieApiSlice"
const MediaMovie = ({ id }: { id: string }) => {
    const { data } = useImagesMovieQuery(id)
    const { data: videos } = useVideosMovieQuery(id)
    console.log(data)


    return (
        <>
            <p>Media</p>
        </>
    )
}

export default MediaMovie