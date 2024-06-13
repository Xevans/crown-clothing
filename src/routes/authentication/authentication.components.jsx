import SignUpForm from '../../components/sign-up/sign-up.component';
import SignInForm from '../../components/sign-in/sign-in-form.component';
import { AuthenticationContainer } from './authentication.styles.jsx'

const Authentication = () => {

    return(
        <AuthenticationContainer>
            <SignInForm />
            <SignUpForm />
        </AuthenticationContainer>
    )
}

export default Authentication