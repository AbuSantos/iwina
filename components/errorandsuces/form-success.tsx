import { CheckCircleIcon } from "@heroicons/react/20/solid";

interface FormSuccessProps {
    message?: string;
}

export const FormError = ({ message }: FormSuccessProps) => {
    if (!message) {
        return null
    }

    return (
        <div className="bg-emerald-500/15 rounded-md p-3 flex items-center gap-x-2 text-sm text-emerald-500">
            <CheckCircleIcon className="w-4 h-4" />
            <p>{message}</p>
        </div>
    )

}