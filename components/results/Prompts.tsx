import Image from "next/image"
import success from "@/public/images/success.gif"
import failure from "@/public/images/failure.gif"
import FullButton from "../ui/Buttons"
import { Dispatch, SetStateAction } from "react"
type PromptsType = {
    mode?: string;
    setSuccessful?: Dispatch<SetStateAction<boolean>>
    sucessful?: boolean;
    actionName?: string;


}

const Prompts = ({ mode, setSuccessful, actionName }: PromptsType) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-20">
            <div className="relative bg-gray-200 rounded-md w-5/6">

                {mode === "success"
                    && (
                        <div className="flex  flex-col items-center justify-between p-4 space-y-3">

                            <Image alt="video" src={success} width={50} />
                            <p className='text-xl'>
                                {` Successfully ${actionName}`}
                            </p>

                            < FullButton button_name="Back" onClick={() => setSuccessful(false)} />
                        </div>
                    )
                }

                {
                    mode === "error" &&
                    (<div className="flex  flex-col items-center justify-between p-4 space-y-3">
                        <Image alt="video" src={failure} width={50} />
                        <p className='text-xl'>
                            Failed
                        </p>

                        < FullButton button_name="Back" onClick={() => setSuccessful(true)} />
                    </div>)
                }
            </div>
        </div>

    )
}

export default Prompts