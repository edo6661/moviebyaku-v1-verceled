import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import BannerSection from '../../components/firstSection/BannerSection';
import FirstSection from "../../components/firstSection/FirstSection";
import PopularSection from "../../components/firstSection/PopularSection";
import { useAccountIdQuery, useRequestTokenQuery, useSessionIdMutation } from '../../features/account/accountApiSlice';
import useProvider from '../../hooks/useProvider';
import useTitle from "../../hooks/useTitle";

const HomePage = () => {
    const [sessionId, setSessionId] = useState('')
    const { setRequestToken, requestToken, profile, setProfile } = useProvider()
    const { data, isError, error, isLoading } = useRequestTokenQuery();
    const { data: profileData, isError: isErrP, error: errP } = useAccountIdQuery({ session_id: sessionId })
    const [addSessionToken, { isError: isErrS, error: errS }] = useSessionIdMutation()

    useEffect(() => {
        if (data?.request_token && !isLoading && !isError) {
            setRequestToken(data.request_token)
        }
    }, [data?.request_token])

    if (isError) console.log(error)
    // if (isErrS) console.log(errS)
    if (isErrP) console.log(errP)

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const approved = params.get('approved');
    const urlToken = params.get('request_token')

    const getSessionId = async () => {
        if (urlToken) {
            const { session_id } = await addSessionToken(urlToken?.toString())
            setSessionId(session_id)
        }
    }
    useEffect(() => {
        if (approved === 'true') {
            getSessionId()
        }
    }, [approved])
    useEffect(() => {
        if (sessionId) {
            console.log(profileData)
        }
    }, [sessionId])
    useTitle("Home")
    return (
        <>
            {sessionId}
            {profileData?.username}
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