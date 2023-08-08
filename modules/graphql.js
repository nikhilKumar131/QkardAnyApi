// Define the URL of the GraphQL endpoint
const url = 'https://any-smart-contract-api-ufi6.onrender.com/graphql';
// const url = 'http://localhost:4000/graphql'





// Send the request using the fetch API
function Fetch(_function, _parameters) {

  // Define the query and any variables (if needed)
  const query = `{
    message(function: "${_function}", parameters: [${_parameters}])
  }`;
  console.log(query)

  // Create a request with the query and headers
  const request = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  };

  fetch(url, request)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

Fetch("getDocFromId",["1"]);

export {  Fetch }


