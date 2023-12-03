import { motion } from 'framer-motion';
import { useState } from "react";
import { useImagesMovieQuery, useVideosMovieQuery } from "../../features/movie/movieApiSlice";
import baseImageUrl from "../../utils/baseImgUrl";
import { scrollerVars } from "../../utils/sliderVars";
import ErrorMessage from "../errAndLoading/TemporaryError";
import MyButton from "./ActiveButton";
import VideoMovie from "./VideoMovie";
const MediaMovie = ({ id }: { id: string }) => {

    const [activeButton, setActiveButton] = useState('videos');
    const { data: images, isLoading: loadingI, isError: isErrI, error: errI } = useImagesMovieQuery(id)
    const { data: videos, isLoading: loadingV, isError: isErrV, error: errV } = useVideosMovieQuery(id)

    const errMsgV = isErrV && errV && <ErrorMessage error={errV} />
    const errMsgI = isErrI && errI && <ErrorMessage error={errI} />

    const activeVideos = () => setActiveButton('videos')
    const activePosters = () => setActiveButton('posters')
    const activeBackdrops = () => setActiveButton('backdrops')
    const videosTrue = activeButton === 'videos'
    const postersTrue = activeButton === 'posters'
    const backdropsTrue = activeButton === 'backdrops'
    const elementVideos = videosTrue && !loadingV && !isErrV && videos?.results.filter(video => video.site === 'YouTube').slice(0, 12).map((video) => {
        return (
            <VideoMovie
                {...video}
                key={video.id}
                videoKey={video.key}
            />
        )
    })
    const elementPosters = postersTrue && !loadingI && !isErrI && (
        images?.posters.slice(0, 12).map((poster) => {
            return (
                <motion.img className=" imgSliderMedia" src={`${baseImageUrl}${poster.file_path}`} alt="Posters"
                    variants={scrollerVars}
                    initial="initial"
                    whileInView="animation"
                    viewport={{ once: true }}
                />
            )
        })
    )
    const elementBackdrops = backdropsTrue && !loadingI && !isErrI && (
        images?.backdrops.slice(0, 12).map((poster) => {
            return (
                <motion.img className=" imgSliderMedia" src={`${baseImageUrl}${poster.file_path}`} alt="backdrops"
                    variants={scrollerVars}
                    initial="initial"
                    whileInView="animation"
                    viewport={{ once: true }}
                />
            )
        })
    )

    return (
        <>
            <div className="">
                <div className="flex items-center mb-3 gap-4">
                    {errMsgV}
                    {errMsgI}
                    <h5 className="headersSingleMovie  ">Media</h5>
                    <MyButton
                        active={videosTrue}
                        setActive={activeVideos}
                        label={!isErrV && !loadingV && videos?.results.length ? "Videos" : 'No Videos'}
                        count={videos?.results.length ?? 0}
                    />
                    <MyButton
                        active={backdropsTrue}
                        setActive={activeBackdrops}
                        label={!isErrI && !loadingI && images?.backdrops.length ? "Backdrops" : 'No Backdrops'}
                        count={images?.backdrops.length ?? 0}
                    />
                    <MyButton
                        active={postersTrue}
                        setActive={activePosters}
                        label={!isErrI && !loadingI && images?.posters.length ? "Posters" : 'No Posters'}
                        count={images?.posters.length ?? 0}
                    />

                </div>
                <div className="containerScrollSingleMovie gap-0">
                    {elementVideos}
                    {elementBackdrops}
                    {elementPosters}
                </div>
            </div>

        </>
    )
}

export default MediaMovie