import { useState, useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth'
import Button, { BUTTON_TYPES } from '../../components/buttons/button.component';
import FormInput from '../../components/form-input/form-input.component';

import {SignInContainer, ButtonsContainer} from "./sign-in-form.styles.jsx"

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
        await signInWithGooglePopup(); // retrieve the user object from the signInWithGooglePopup function.
    }


    return (
        <SignInContainer>
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

                <ButtonsContainer>
                    <Button type='submit' buttonType={BUTTON_TYPES.base}>Sign in</Button>
                    <Button type='button' buttonType={BUTTON_TYPES.google} onClick={logGoogleUser}> Sign in with Google </Button>
                </ButtonsContainer>
            </form>
            
        </SignInContainer>
    )
}

export default SignInForm