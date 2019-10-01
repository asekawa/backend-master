# aseka-backend

## How to run
1. Clone the repository `git clone https://github.com/pavinduLakshan/aseka-backend.git`
2. Navigate to project folder and run `npm install`
3. Start local mongodb server by opening a separate command prompt window and typing `mongod`. This will respond with a long
 message which ends with `waiting for connections in port` message.
4. To test login in the mobile app, you should first register a user. if you don't already have a user registered, make a POST 
request as follows.
   
    > url: http://localhost:3000/api/register
    >
    > body: {
    >
    >      fullName: "Aseka",
    >
    >      email: "example@gmail.com",
    >
    >      password: "12345"
    >
    > }
5. After registering a user, try login from the mobile app with the email and the password.
