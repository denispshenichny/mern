import React from 'react'
import {Link} from 'react-router-dom'

export const LinksList = ({links}) => {
    if(!links.length)
        return <p className="center">No saved links</p>
    return (
        <div>
            <table className="striped">
                <thead>
                <tr>
                    <th>#</th>
                    <th>From:</th>
                    <th>To:</th>
                    <th>Count:</th>
                    <th>Open:</th>
                </tr>
                </thead>

                <tbody>
                { links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>{link.clicks}</td>
                            <td><Link to={`/detail/${link._id}`} >Open</Link></td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}
