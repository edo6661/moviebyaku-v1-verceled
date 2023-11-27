import SearchBar from '../../components/SearchBar';
import BannerSection from '../../components/firstSection/BannerSection';
import FirstSection from "../../components/firstSection/FirstSection";
import PopularSection from "../../components/firstSection/PopularSection";
import useTitle from "../../hooks/useTitle";

const HomePage = () => {

    useTitle("Home")
    return (
        <>
            <SearchBar />
            <BannerSection />
            <FirstSection />
            <PopularSection />
            <section className=" min-h-[50vh]">

            </section>
        </>
    )
}

export default HomePage