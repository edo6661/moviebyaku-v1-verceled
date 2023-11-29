/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BannerSection from '../../components/firstSection/BannerSection';
import FirstSection from "../../components/firstSection/FirstSection";
import PopularSection from "../../components/firstSection/PopularSection";
import { useAccountIdQuery, useRequestTokenQuery, useSessionIdMutation } from '../../features/account/accountApiSlice';
import useProvider from '../../hooks/useProvider';
import useTitle from "../../hooks/useTitle";
// ! coba pake axios
const HomePage = () => {
    const { setRequestToken, setProfile, setSessionId, sessionId } = useProvider()
    const { data, isError, error, isLoading } = useRequestTokenQuery();
    const { data: profileData, isError: isErrP, error: errP } = useAccountIdQuery({
        session_id: sessionId
    })
    const [addSessionToken, { isError: isErrS, error: errS }] = useSessionIdMutation()
    useEffect(() => {
        if (data?.request_token && !isLoading && !isError) {
            setRequestToken(data.request_token)
        }
    }, [data?.request_token])

    if (isError) console.log(error)
    if (isErrS) console.log(errS)
    if (isErrP) console.log(errP)

    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const approved = params.get('approved');
    const urlToken = params.get('request_token')

    const getSessionId = async () => {
        if (urlToken) {
            const response = await addSessionToken(urlToken?.toString())
            if ('data' in response) {
                if (response.data.session_id) {
                    setSessionId(response.data.session_id);
                }
            } else {
                console.error('Error adding session token:', response.error);
            }
        }
    };
    useEffect(() => {
        if (approved === 'true') {
            getSessionId()
        }
    }, [approved])
    useEffect(() => {
        const isSessionIdValid = sessionId !== undefined && sessionId !== '' && sessionId !== null;

        if (isSessionIdValid && profileData) {
            setProfile(profileData);
            // console.log(sessionId);
            // console.log(profile);
            // console.log(profileData);
        }
    }, [sessionId, profileData]);
    useTitle("Home")
    return (
        <>
            <BannerSection />
            <FirstSection />
            <PopularSection />
            <section className=" min-h-[50vh]">

            </section>
        </>
    )
}

export default HomePage