import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

interface FormErrorProps {
    message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) {
        return null
    }

    return (
        <div className="bg-destructive/15 rounded-md p-3 flex items-center gap-x-2 text-sm text-destructive ">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <p>{message}</p>
        </div>
    )

}