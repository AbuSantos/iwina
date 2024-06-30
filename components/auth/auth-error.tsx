import { AuthHeader } from "@/components/auth/header"
import { BackButton } from "@/components/auth/back-button"
import { Card, CardFooter, CardHeader } from "@/components/ui/card"
const AuthErrorCard = () => {
    return (
        <Card className="w-400px shadow-md">
            <CardHeader>
                <AuthHeader label="Opps, something went wrong" />
            </CardHeader>
            <CardFooter
            >
                <BackButton label="Back to login" href="/auth/login" />
            </CardFooter>
        </Card>

    )
}

export default AuthErrorCard