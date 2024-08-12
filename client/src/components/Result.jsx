import React from 'react'

const Result = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length} results</strong>
    </p>
  );
};

export default Result
