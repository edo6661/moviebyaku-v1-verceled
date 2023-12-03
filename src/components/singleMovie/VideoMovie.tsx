import { motion } from 'framer-motion';
import { scrollerVars } from "../../utils/sliderVars";

const VideoMovie = ({ id, name, videoKey }: VideoResult) => {
    return (
        <motion.div key={id} className="singleMovieScrollContainer"
            variants={scrollerVars}
            initial="initial"
            whileInView="animation"
            viewport={{ once: true }}
        >
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoKey}`}
                title={name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            />
        </motion.div >
    )
}

export default VideoMovie