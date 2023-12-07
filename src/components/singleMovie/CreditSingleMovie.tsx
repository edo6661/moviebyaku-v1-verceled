import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import baseImageUrl from "../../utils/baseImgUrl";
import { scrollerVars } from "../../utils/sliderVars";

const CreditSingleMovie = ({ name, character, profile_path, id }: CastMember) => {
    return (
        <motion.div
            className='singleDetailsCrsl'
            variants={scrollerVars}
            initial="initial"
            whileInView="animation"
            viewport={{ once: true }}
        >
            <Link to={`/person/${id}`}>
                <img src={`${baseImageUrl}${profile_path}`} alt={name}
                    className=' h-[216px] hoveredPoster '
                />

            </Link>
            <p className=" singleMovieTitle">{name}</p>
            <p className=" text-base">{character}</p>
        </motion.div>
    )
}

export default CreditSingleMovie