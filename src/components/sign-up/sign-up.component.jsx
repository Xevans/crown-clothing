import { useState } from 'react'
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

    const logEmailPasswordUser = async () => {
        const user = await createAuthUserWithEmailAndPassword(email, password);
        
        if(user) user.displayName = username; // update user object with form-provided displayname

        const userDocRef = await createUserDocumentFromAuth(user); // create a valid user document/record in the db using this authenticated email/password user
        //console.log(userDocRef);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // ensure passwords match
        if (!password === confirmPassword) return;
        //console.log('password and confirm password match!');

        // create user in firebase
        logEmailPasswordUser();
    }

    const handleChange = (event) => {
        // update json data field with respective form field as the user types
        const { name, value } = event.target; // destructure/extract needed data from json obj
        setFormFields({...formFields, [name]: value}) //  only want to modify the value 'value' of the object memebers but with their respective key names '[name]'
    };

    return(
        <div>
            <h1> Sign up page</h1>
            <form onSubmit={() => {
                //handleSubmit();
            }}>
                <label>Username</label>
                <input type='text' required onChange={handleChange} name='username' value={username} />

                <label>Email</label>
                <input type='email' required onChange={handleChange} name='email' value={email} />

                <label>Password</label>
                <input type='password' required onChange={handleChange} name='password' value={password} />

                <label>Confirm Password</label>
                <input type='password' required onChange={handleChange} name='confirmPassword' value={confirmPassword} />
                <button type="submit" onClick={handleSubmit}>Sign Up</button>
            </form>
        </div>
    );
}

export default SignUpForm;