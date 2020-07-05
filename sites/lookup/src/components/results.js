import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import gql from 'graphql-tag'

const SEARCH_QUERY = gql `
    query($name: String!) {
        characters(filter: {name: $name}) {
            results {
                id
                name
                species
                origin {
                    name
                }
                location {
                    name
                    dimension
                }
                image
            }
        }
    }
`;

const Results = ({name}) => {
    const {loading, error, data} = useQuery(SEARCH_QUERY, {variables: {name}})

    const hasResults = data && (data.characters.results.length || []).length > 0;

    return (
        <div style={{maxWidth: 500, margin: '50px auto'}}>
            <h2>Search Results</h2>
            {loading && <p>Loading results...</p>}
            {error && (
                <pre style={{overflowX: 'scroll'}}>
                    {JSON.stringify(error, null, 2)}
                </pre>
            )}
            {hasResults ? 
                data.charaters.results.map(character => (
                    <div key={character.id} style={{display: 'flex', marginBottom: 40}}>
                        <div style={{width: 100, marginRight: 20}}>
                            <img src={character.image} alt={character.name} style={{width: '100%'}} />
                        </div>
                        <div>
                            <h3>{character.name}</h3>
                        </div>
                    </div>
                ))
                : !loading && <p>No Result Found!</p>    
        }
        </div>
    )
}


export default Results
