import { useState } from 'react'
import './sign-up-form.styles.scss'
import Button from '../buttons/button.component';
import FormInput from '../form-input/form-input.component';
import { 
    createAuthUserWithEmailAndPassword,
    auth,
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
        const user = await createAuthUserWithEmailAndPassword(email, password);
        
        if(user) user.displayName = username; // update user object with form-provided displayname

        const userDocRef = await createUserDocumentFromAuth(user); // create a valid user document/record in the db using this authenticated email/password user
        //console.log(userDocRef);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // ensure passwords match
        if (!password === confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        //console.log('password and confirm password match!');

        // create user in firebase
        try {
            logEmailPasswordUser();
            resetFormFields();
        } catch (error) {
            if(error.code == 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            }
            else {
                console.log('User creation encountered an error.', error);
            }
        }
    }

    const handleChange = (event) => {
        // update json data field with respective form field as the user types
        const { name, value } = event.target; // destructure/extract needed data from json obj
        setFormFields({...formFields, [name]: value}) //  only want to modify the value 'value' of the object memebers but with their respective key names '[name]'
    };

    return(
        <div className='sign-up-container'>
        <h2>Dont have an account?</h2>
        <span>Sign Up with your email and password</span>
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
                    label="password"
                    inputOptions = {{
                        type: 'password',
                        required: true,
                        onChange: handleChange, 
                        name: 'password',
                        value: password
                    }}
                />

                <FormInput 
                    label="Confirm Cappword"
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
        </div>
    );
}

export default SignUpForm;