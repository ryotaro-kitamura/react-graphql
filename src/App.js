import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
 
const query = gql`
  {
    viewer { 
      name
      repositories(first: 3){
        edges{
          node{
            name
            url
          }
        }
      }
    }
  }
`

const App = () => (
  <Query query={query}>
    {({loading, error, data}) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>{error.toString()}</p>;

      console.log(data);

      const name = data.viewer.name
      const repositories = data.viewer.repositories.edges

      return (
        <div style={{textAlign: "center"}}>
          <h2>{name}のGithub</h2>
          <h3>最初の3つのRepositoryを取得してみたよ!</h3>
          <ul>
            {repositories.map(r => (
              <li key={r.node.id} style={{listStyle: "none"}}>
                <a href={r.node.url}>{r.node.name}</a>
              </li>
            ))}
          </ul>
        </div>
      )
    }}
  </Query>
)
 
export default App;
 