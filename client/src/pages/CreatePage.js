import React, {useContext, useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useHttp} from "../hooks/http.hooks";
import {AuthContext} from "../context/authContext";

export const CreatePage = () => {
    const [link, setLink] = useState('')

    const {request} = useHttp()
    const history = useHistory()
    const auth = useContext(AuthContext)
    useEffect(() => {
        window.M.updateTextFields()
    },[])
    const keyPressHandler = async event => {
        if (event.key !== 'Enter')
            return;
        try {
            const data = await request('/api/link/generate', 'POST', { from: link }, {
                Authorization: `Bearer ${auth.token}`
            })
            history.push(`/detail/${data.link._id}`)
        } catch (e) { }
    }
    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <input
                    placeholder="Input link"
                    id="link"
                    type="text"
                    value={link}
                    onChange={e => setLink(e.target.value)}
                    onKeyPress={keyPressHandler}
                />
                <label htmlFor="link">Link</label>
            </div>
        </div>
    )
}
