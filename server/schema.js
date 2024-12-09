import { _db } from "./_db.js";
export const typeDefs = `
type review{
id:ID!
title:String!
}
type Query{
review(id:ID!):review
reviews:[review]
}
type Mutation{
addReview(review:AddReviewInput!):review
deleteReview(id:ID!):[review],
updateReview(id:ID!,edits:EditReviewInput):review
}
input EditReviewInput{
title:String
}
input AddReviewInput{
  title:String!
  }
`;
export const resolvers = {
  Query: {
    reviews: () => _db.reviews,
    review: (_, args) => {
      return _db.reviews.find((review) => review.id === args.id);
    },
  },
  Mutation: {
    addReview: (_, args) => {
      const newReview = { id: Date.now().toString(), ...args.review };
      _db.reviews.push(newReview);
      return newReview;
    },
    updateReview: (_, args) => {
      _db.reviews = _db.reviews.map((review) => {
        if (review.id === args.id) {
          return { ...review, ...args.edits };
        }
        return review;
      });
      return _db.reviews.find((review) => review.id === args.id);
    },
    deleteReview: (_, args) => {
      _db.reviews = _db.reviews.filter((review) => review.id !== args.id);
      return _db.reviews;
    },
  },
};
