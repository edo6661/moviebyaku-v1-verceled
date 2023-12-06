import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCreditsPeopleQuery } from '../../features/people/peopleApiSlice';
import baseImageUrl from "../../utils/baseImgUrl";
import CastPerson from './CastPerson';

const FirstSectionSinglePerson = ({ also_known_as, biography, birthday, known_for_department, place_of_birth, profile_path, name, gender }: PersonDetails) => {
    const [isMore, setIsMore] = useState(false)
    const [sortedCast, setSortedCast] = useState<CastCredit[]>([])

    const { id } = useParams()

    const { data } = useCreditsPeopleQuery(id ?? '')


    useEffect(() => {
        if (data?.cast) {
            const newCast = data.cast.filter(cast => !sortedCast.includes(cast));
            setSortedCast(prev => [...prev, ...newCast]);
        }
    }, [data])

    const more = () => setIsMore(prev => !prev)

    return (
        <article className='text-base' >
            <div className='grid grid-cols-2 sm:grid-cols-3 z-10 casualWrapper my-8  innerSingleMovie'>
                <div className={`z-10 mx-0 sm:col-span-1 col-span-full containerPoster flex flex-col gap-4`} >
                    <img className=" mx-auto" src={`${baseImageUrl}${profile_path}`} alt={name} />
                </div>
                <div className='detailsSingleMovie '>
                    <h2 className=' '>{name} </h2>
                    <h3 className="text-xl font-semibold">{biography?.length ? 'Biography' : 'No Biography'}</h3>
                    <p className="text-lg">{!isMore && biography.length > 500 ? biography.slice(0, 400) + '...' : biography}</p>
                    <div className=' text-end'>
                        {biography.length > 500 && (
                            <button className='lg:text-lg text-base font-semibold' onClick={more}>
                                {isMore ? 'Show less' : 'Show more'}
                            </button>
                        )}
                    </div>
                </div>
                <div className=' sm:col-span-1 col-span-2 sm:mt-5 flex flex-col gap-3 shadowCard py-3 px-4 rounded-xl'>
                    <h5 className='text-xl font-semibold mb-2'>Personal Info</h5>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col'>
                            <p className='text-lg font-semibold'>Known for</p>
                            <p>{known_for_department}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-lg font-semibold'>Gender</p>
                            <p>{gender}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-lg font-semibold'>Birthday</p>
                            <p>{birthday} ({birthday && new Date().getFullYear() - Number(birthday?.substring(0, 4))})</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-lg font-semibold'>Place of Birth</p>
                            <p>{place_of_birth}</p>
                        </div>
                        <div className='flex flex-col'>
                            <p className='text-lg font-semibold'>Also known as</p>
                            <p>{also_known_as}</p>
                        </div>
                    </div>
                </div>
                <div className="sm:ml-10 sm:mt-5 col-span-2 detailsSingleMovie ml-0 ">
                    <h4 className='text-xl font-semibold mb-4'>Known For</h4>
                    <div className='containerScrollSingleMovie '>
                        {sortedCast.sort((a, b) => b.popularity - a.popularity).slice(0, 12).map((cast) => {
                            return (
                                <CastPerson key={cast.id} {...cast} />
                            )
                        })}
                    </div>
                </div>
            </div>

        </article>
    )
}

export default FirstSectionSinglePerson