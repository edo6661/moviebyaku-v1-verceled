import { motion } from 'framer-motion';
import { useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import secondNavStuff, { secondNavPerson, secondNavTv } from '../../helpers/secondNavStuff';
import { ddVars, mdRotateVars } from '../../locale/HeaderVars';

const SecondNavMovie = () => {

    const [showDd, setShowDd] = useState<Record<string, boolean>>({})

    const trueDd = (i: string) => setShowDd(prev => ({ ...prev, [i]: true }))
    const falseDd = (i: string) => setShowDd(prev => ({ ...prev, [i]: false }))

    const location = useLocation();

    const personPath = location.pathname.includes('person');
    const tvPath = location.pathname.includes('tv');

    const stuffs = personPath ? secondNavPerson : tvPath ? secondNavTv : secondNavStuff

    return (
        <section className="containerSecondNav relative">
            <article className='' >
                {stuffs.map((stuff, i) =>
                    <div className="innerSecondNav" key={stuff.title} onMouseLeave={() => falseDd(i.toString())}>
                        <div className={`detailsSecondNav ${showDd[i] ? ' opacity-50' : ''}`} onMouseEnter={() => trueDd(i.toString())} >
                            <p className=' select-none'>{stuff.title}</p>
                            <motion.div variants={mdRotateVars} animate={showDd[i] ? 'open' : 'close'}>
                                <svg width="15" height="15" viewBox="0 0 20 20" className=''>
                                    <path className=' fill-darkerMain' d="M0 7 L 20 7 L 10 16" />
                                </svg>
                            </motion.div>
                        </div>
                        <motion.div variants={ddVars}
                            initial="initial"
                            animate={showDd[i] ? 'animate' : ''}
                            exit="exit"
                            onMouseLeave={() => falseDd(i.toString())}
                            className='dropDownSecondNav'  >
                            {stuff.items.map(s =>
                                <Link to={s.to} key={s.title}
                                    className={`transitionSecondNav ${showDd[i] ? 'hover:opacity-50' : ''}`}>{s.title}</Link>
                            )}
                        </motion.div>
                    </div>
                )}
            </article>
        </section>
    )
}

export default SecondNavMovie