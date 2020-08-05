import React from 'react'

export const LinkCard = ({link}) => {
    return (
        <div>
            <h2>Ссылка</h2>
            <p>From: <a href={link.from} target="_blank" rel="noopener noreferrer">{link.from}</a></p>
            <p>To: <a href={link.to} target="_blank" rel="noopener noreferrer">{link.to}</a></p>
            <p>Clicks count: <strong>{link.clicks}</strong></p>
            <p>Creation date: <strong>{new Date(link.date).toLocaleDateString()}</strong></p>
        </div>
    )
}
