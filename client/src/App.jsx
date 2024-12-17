import "./App.css";
import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const GET_REVIEW = gql`
    query ReviewAllData {
      reviews {
        title
        id
      }
    }
  `;
  const ADD_REVIEW = gql`
  mutation AddReivew($review: AddReviewInput!) {
    addReview(review: $review) {
      title
    }
  }
`;

  const [addReview] = useMutation(ADD_REVIEW);
  const { loading, error, data } = useQuery(GET_REVIEW);
  


  const submitHandler = () => {
    addReview({ variables: { review:{title:input} } });
  };
  
  
  return (
    <div className="App">
      <div>
        <h2>Form</h2>
        <input placeholder="title" onChange={(e) => setInput(e.target.value)} />
        <button onClick={submitHandler}>Submit</button>
      </div>
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
