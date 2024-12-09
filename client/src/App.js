import "./App.css";
import { gql, useQuery } from "@apollo/client";
function App() {
  const GET_REVIEW = gql`
    query ReviewAllData {
      reviews {
        title
        id
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_REVIEW);
  return (
    <div className="App">
      <h2>Graphql API Integration</h2>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data?.reviews.map((review) => (
        <div key={review.id}>
          <h3>{review.title}</h3>
        </div>
      ))}
    </div>
  );
}

export default App;
