import { useState, useEffect, useContext } from 'react';
import { getRedirectResult } from 'firebase/auth'
import Button from '../../components/buttons/button.component';
import FormInput from '../../components/form-input/form-input.component';

import { UserContext } from '../../contexts/user.context'; // returns the state object for whatever the userState is currently set at

import "./sign-in-form.styles.scss"

import { 
    auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInWithGoogleRedirect,
    signInUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils';

const SignInForm = () => {

     //default states for sign-in form members
    const defaultFormFields = { // pre-defineing state data because we know exactly what is going to go in there and know that should be the case every time
        email: '',
        password: '',
    }

    const { setCurrentUser} = useContext(UserContext) // we are destructuring the setter member of the context state because we just want to update the user context in this component.


    /* state tracking */
    const [formFields, setFormFields] = useState(defaultFormFields); //setting default state// returns the default fields and setformfield logic to the array elements respectively
    const { email, password } = formFields // destructure values from json obj for short handing
    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    // update respective state values as user types
    const handleChange = (event) => {
        // update json data field with respective form field as the user types
        const { name, value } = event.target; // destructure/extract needed data from json obj
        setFormFields({...formFields, [name]: value}) //  only want to modify the value 'value' of the object memebers but with their respective key names '[name]'
    };


    /* email password sign in */
    const signInUser = async () => {
        try {
           const {user} = await signInUserWithEmailAndPassword(email, password);
           setCurrentUser(user); // update the global user context
        } catch (error) {
            if (error === 'auth/user-not-found') {
                alert('no user associated with this email');
            } 
            else {
                alert('Incorrect Email or Password.', error);
            }
        } 
        
    }

    // user submits their email and password for sign in
    const handleSubmit = (event) => {
        event.preventDefault();
        signInUser();// try to log in with email and password in firebase
        resetFormFields();
    }

    /* Google sign in */
    // google redirect sign in
    const doRedirectResult = async() => {
        await getRedirectResult(auth);

    }

    useEffect( () => { // useEffect does not like being declared as asyncronous, had to separate code inside a function called doRedirectResult
        doRedirectResult();
    }, [])


    // google pop-up sign in method
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup(); // retrieve the user object from the signInWithGooglePopup function.
        //setCurrentUser(user);
        await createUserDocumentFromAuth(user); // create a valid user document/record in the db using thise authenticated google user
        
    }


    return (
        <div className='sign-in-container'>
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput 
                    label="Email"
                    inputOptions = {{
                        type: 'email',
                        required: true,
                        onChange: handleChange, 
                        name: 'email',
                        value: email
                    }}
                />

                <FormInput 
                    label="Password"
                    inputOptions = {{
                        type: 'password',
                        required: true,
                        onChange: handleChange, 
                        name: 'password',
                        value: password
                    }}
                />

                <div className='buttons-container'>
                    <Button type='submit'>Sign in</Button>
                    <Button type='button' buttonType={'google'} onClick={logGoogleUser}> Sign in with Google </Button>
                </div>
            </form>
            
        </div>
    )
}

export default SignInForm