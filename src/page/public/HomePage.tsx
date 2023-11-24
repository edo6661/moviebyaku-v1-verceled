import FirstSection from "../../components/firstSection/FirstSection"
import useTitle from "../../hooks/useTitle"

const HomePage = () => {
    useTitle("Home")
    return (
        <FirstSection />
    )
}

export default HomePage