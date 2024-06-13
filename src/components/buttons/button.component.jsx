import { BaseButton, GoogleSignInButton, InvertedButton } from "./button.styles.jsx"

/* Button types in this project: fedault, inverted, google sign in */
// enumerators for possible custom prop values that may be assigned.
// e.g. if I pass the prop buttonTypes with the value: google. React will apply the google-sign-in class (consequently its styling) to the button element.
export const BUTTON_TYPES = {
    base: 'base',
    google: 'google-sign-in', // 
    inverted: 'inverted',
}

const getButton = (buttonType = BUTTON_TYPES.base) => ({
    [BUTTON_TYPES.base]: BaseButton, // if button type is base, return BaseButton component
    [BUTTON_TYPES.google]: GoogleSignInButton,
    [BUTTON_TYPES.inverted]: InvertedButton,
    
}[buttonType]);

const Button = ({ children, buttonType, ...otherProps }) => {

    const CustomButton = getButton(buttonType);

    return (
        <CustomButton {...otherProps}> {/* otherProps is what makes all the other properties work*/}
            {children} {/* any child in between the open close tags*/}
        </CustomButton>
    )
}

export default Button;