import "./form-input.styles.scss"

const FormInput = ({ label, inputOptions }) => { // deconstucted from props

    return(
        <div className="group">
            <input className="form-input" {...inputOptions} /> {/* other props will apply all other props that we would otherwise hard code here: <input type='text' required onChange={handleChange} name='username' value={username} /> */}
            {/* If no label prop is passed into this component, dont render the label. So check if it exists first */}
            {label && (
                <label className={`${inputOptions.value.length ? 'shrink' : ''} form-input-label`}> {/* if the length of the string in value > 0/ if the string in value exists, apply the shrink class, otherwise, apply the class '' (<- none basically). form-input-label will still apply regardless since it is not declared as conditional*/}
                    {label}
                </label>
            )}
        </div>
    )
}

export default FormInput;