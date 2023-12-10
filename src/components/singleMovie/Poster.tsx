import baseImageUrl from "../../utils/baseImgUrl";

const Poster = ({ poster_path, title }: { poster_path: string; title: string }) => {
    return (
        <div className={`containerPoster bg-[url()] z-20`}   >
            <img className="hoveredPoster" src={`${baseImageUrl}${poster_path} `} alt={title} />
        </div>
    )
}

export default Poster