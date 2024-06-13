import { useState, useContext } from 'react'
import { SignUpContainer, ButtonsContainer } from './sign-up-form.styles.jsx'
import Button from '../buttons/button.component';
import FormInput from '../form-input/form-input.component';
import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils'; 

const defaultFormFields = { // pre-defineing state data because we know exactly what is going to go in there and know that should be the case every time
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields); //setting default state// returns the default fields and setformfield logic to the array elements respectively
    const { username, email, password, confirmPassword } = formFields // destructure values from json obj for short handing

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

     
    const logEmailPasswordUser = async () => {
        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            if(user) user.displayName = username; // update user object with form-provided displayname
            await createUserDocumentFromAuth(user); // create a valid user document/record in the db using this authenticated email/password user
        } catch (error) {
            if(error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } 
            else {
                console.log('User creation encountered an error.', error);
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // ensure passwords match
        if (!password === confirmPassword) {
            alert("Passwords do not match!");
            return;
        } else if (password.length < 6) {
            alert('Password is too weak. Password should be at least 6 characters');
            return;
        }
        // create user in firebase
        logEmailPasswordUser();
        resetFormFields();
    }

    const handleChange = (event) => {
        // update json data field with respective form field as the user types
        const { name, value } = event.target; // destructure/extract needed data from json obj
        setFormFields({...formFields, [name]: value}) //  only want to modify the value 'value' of the object memebers but with their respective key names '[name]'
    };

    return(
        <SignUpContainer>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Display Name"
                    inputOptions = {{
                        type: 'text',
                        required: true,
                        onChange: handleChange, 
                        name: 'username',
                        value: username
                    }}
                />

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

                <FormInput 
                    label="Confirm Password"
                    inputOptions = {{
                        type: 'password',
                        required: true,
                        onChange: handleChange, 
                        name: 'confirmPassword',
                        value: confirmPassword
                    }}
                />
                <Button type="submit">Sign Up</Button>
            </form>
        </SignUpContainer>
    );
}

export default SignUpForm;