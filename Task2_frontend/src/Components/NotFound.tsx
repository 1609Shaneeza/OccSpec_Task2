import { useEffect } from "react";


function NotFound() {
      useEffect(() => {
        document.title = "Not Found";
      });
    return(
        <>
        <br></br>
        <h1>Sorry, page not Found</h1>
        <br></br>
        </>
    )
}

export default NotFound;