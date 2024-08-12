import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import StartRating from "./components/StartRating.jsx";
// import './index.css'

// const Test = () => {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StartRating
//         color="blue"
//         size={30}
//         maxRating={10}
//         onSetRating={setMovieRating}
//       />
//       <p>This movie was rated {movieRating} stars</p>
//     </div>
//   );
// };

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/* <StartRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Excellent"]}
    /> */}
    {/* <StartRating size={10} color="red" defaultRating={2} /> */}
    {/* <Test /> */}
  </React.StrictMode>
);
