import "./button.styles.scss"

/* Button types in this project: fedault, inverted, google sign in */
// enumerators for possible custom prop values that may be assigned.
// e.g. if I pass the prop buttonTypes with the value: google. React will apply the google-sign-in class (consequently its styling) to the button element.
const BUTTON_TYPES = {
    google: 'google-sign-in', // 
    inverted: 'inverted',
}

const Button = ({ children, buttonType, ...otherProps }) => {
    return (
        <button className={`button-container ${BUTTON_TYPES[buttonType]}`} {...otherProps}> {/* otherProps is what makes all the other properties work*/}
            {children} {/* any child in between the open close tags*/}
        </button>
    )
}

export default Button;