import { useParams } from "react-router-dom"
const SingleTv = () => {

    const { id } = useParams()

    return (
        <section>
            test tv {id}
        </section>
    )
}

export default SingleTv