import baseImageUrl from "../../utils/baseImgUrl";
import MovieDetails from "./MovieDetails";
import Poster from './Poster';

const FirstSectionSingleMovie = ({ title, release_date, backdrop_path, poster_path, id, idParams, vote_average, genres, tagline, overview }: MovieDetails) => {

    const backdrop = `${baseImageUrl}${backdrop_path}`

    return (
        <>

            <div className={`backdropSingleMovie backDrop`}></div>
            <img className={`backDrop -z-10 `} src={backdrop} alt="" />
            <div className={`innerSingleMovie relative `} >
                <Poster title={title ?? ''} poster_path={poster_path ?? ''} />
                <MovieDetails title={title} release_date={release_date} vote_average={vote_average} genres={genres} tagline={tagline} overview={overview} id={id} idParams={idParams} />
            </div>

        </>
    )
}

export default FirstSectionSingleMovie