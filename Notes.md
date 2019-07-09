## Setup

`npm install`
`npm run start`

Open http://localhost:8000/

## Features I worked on:

-   _a) Implement ability to search in messages list:_ An input box can be used to filter through all key values of the search. It also displays the filtered number out of the total results.
-   _b) Change the application such that it unsubscribes automatically after 15000 messages received from the server:_ The query `Unsubscribe` after 15000 calls
-   _d) Add some tests for either the existing logic or new logic that you add_ Added a few test cases for MessageList. A couple of issues coming from legacy code, which I have commented in the MessageList.spec.jsx

## Thoughts:

Overall code seems to be good. I had to update and add a few libraries. The Hot reload doesnt maintain the session, which meant any updates I was making to the code, I had to reconnect to the sockets. I had a test fail due to some methods from legacy code being undefined - Cannot read property 'scrollToRow' of undefined.
