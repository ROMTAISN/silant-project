import { jwtDecode } from "jwt-decode";


const JWT = () => {

    const token = 'YOUR_JWT_TOKEN';

if (!token) {
   console.log('No token provided.');
} else {
   try {
       const decodedToken = jwtDecode(token);
       const currentTime = Date.now() / 1000;

       if (decodedToken.exp < currentTime) {
           console.log('Token has expired.');
           // logout user or refresh token
       } else {
           console.log('Token is still valid.');
       }
   } catch (e) {
       console.error('Invalid token format.', e);
       // Handle invalid token
   }
}
    return (
        <div>
            Not found
        </div>
    )
}

export default JWT;