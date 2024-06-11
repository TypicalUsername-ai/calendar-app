import RegisterForm, { RegisterInfo, RegisterErrors } from "@/components/Authorization/RegisterForm"
import authContext from "@/utils/authContext"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const validate = (data: RegisterInfo) => {
    var errors: RegisterErrors = { usernameError: null, emailError: null, passwordError: null, passwordConfirmationError: null }
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
        errors.emailError = "Invalid email format"
    }

    // Password and confirmation match
    if (data.password !== data.passwordConfirmation) {
        errors.passwordConfirmationError = "Passwords do not match"
    }

    // Username validation (only alphanumeric characters)
    const usernameRegex = /^[a-zA-Z0-9]+$/
    if (!usernameRegex.test(data.username)) {
        errors.usernameError = "Username can only contain alphanumeric characters"
    }

    // Return errors if any
    if (errors.emailError || errors.passwordError || errors.passwordConfirmationError || errors.usernameError) {
        return errors
    }

    return null
}


export default () => {

    const auth = useContext(authContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.currentUser()) {
            navigate('/calendar');
        }
    }, []);

    const handleSubmit = async (data: RegisterInfo) => {
        const newAccount = await auth.signup(data.email, data.password, { username: data.username });
        console.log(newAccount)

    }

    return (
        <div>
            <RegisterForm validate={validate} onSubmit={handleSubmit} />
        </div>
    )
}
