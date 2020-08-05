import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/authContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = () => {
    const {request, loading} = useHttp()
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const {token} = useContext(AuthContext)

    const getLink = useCallback(async () => {
        try {
            const data = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setLink(data)
        } catch (e) {

        }
    }, [token, linkId, request])

    useEffect(() => {
        getLink()
    }, [getLink])
    if(loading)
        return <Loader />

    return (
        <div>
            {!loading && link && <LinkCard link={link} />}
        </div>
    )
}
