import React from 'react'
import "./Header.css"

export default function Header({ title }) {
    //return <h1 className="header">{title}</h1>
    return (
        <>
            <h1 className="header">{title}</h1>
            <h3 title="Header" className="header" data-testid="header-test-id">Cats</h3>
        </>
    )
}
