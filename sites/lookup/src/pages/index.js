import React from 'react'
import {Link} from 'gatsby'

const Index = () => (
    <>
        <h1>Rick & Morty Character lookuop</h1>
        <p>
            Look up your favourite character from <em>Rick & Morty</em> using the <a href='https://rickandmortyapi.com'>Rick & Morty API</a>
        </p>
        <Link to = '/search'>Search</Link>
    </>
)

export default Index