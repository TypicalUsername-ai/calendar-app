import RegisterForm from "@/components/Authorization/RegisterForm"

const validate = (data) => {
    const errors = {
        emailError: null,
        passwordError: null,
        passwordConfirmationError: null,
        usernameError: null,
    }

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

const handleSubmit = async (data, setErrors) => {
    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        })
        const result = await response.json()
        if (response.ok) {
            // Handle successful form submission
            console.log("Form submitted with data:", result)
        } else {
            // Handle server-side validation errors if any
            setErrors({ emailError: result.message, passwordError: null, passwordConfirmationError: null, usernameError: null })
        }
    } catch (error) {
        setErrors({ emailError: 'Registration failed. Please try again later.', passwordError: null, passwordConfirmationError: null, usernameError: null })
    }
}

export default () => {
    return (
        <div>
            <RegisterForm validate={validate} onSubmit={handleSubmit} />
        </div>
    )
}
