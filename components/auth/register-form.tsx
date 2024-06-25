import { CardWrapper } from "@/components/auth/card-wrapper"

export const RegisterForm = () => {
    return (
        <CardWrapper
            headLabel="Welcome Back"
            backButtonLabel="Already have an account?"
            backButtonHref="/auth/login"
            showSocial
        >Register form</CardWrapper>
    )
}

export default RegisterForm