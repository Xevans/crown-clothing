import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'

import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect 
} from '../../utils/firebase/firebase.utils';

import SignUpFrom from '../../components/sign-up/sign-up.component';


const SignIn = () => {

    const doRedirectResult = async() => {
        const response = await getRedirectResult(auth);
        console.log(response);
        if (response) { // if response not null, generate a document/record reference
            const userDocRef = await createUserDocumentFromAuth(response.user);
        }

    }

    useEffect( () => { // useEffect does not like being declared as asyncronous, had to separate code inside a function called doRedirectResult
        const response = doRedirectResult();
    }, [])

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup(); // retrieve the user object from the signInWithGooglePopup function.
        const userDocRef = await createUserDocumentFromAuth(user); // create a valid user document/record in the db using thise authenticated google user
        
    }

    return(
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign in with google popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign in with google redirect
            </button>

            <SignUpFrom />
        </div>
    )
}

export default SignIn