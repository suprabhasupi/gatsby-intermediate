import React from 'react'
import {Link} from 'gatsby'
import Form from '../components/form'
import Results from '../components/results'

const Search = ({location}) => {
    const query = (location.state && location.state.query) || location.pathName.replace(/^\/search\?/, '') || '';
    const name = query.replace(/-+/g, ' ');

    return (
        <>
        <h1>Search for Rick & Morty Character</h1>
        <p>
            Trying to remember?
        </p>
        {/* TODO search form */}
        <Form />
        <Results name={name} />
        {/* TODO result */}
    </>
    )
}

export default Search