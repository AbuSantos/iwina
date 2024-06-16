import Image from "next/image"
import success from "@/public/images/success.gif"
import failure from "@/public/images/failure.gif"
import FullButton from "../ui/Buttons"

const Prompts = ({ mode }) => {
    return (
        <div className='flex flex-col  items-center justify-center p-4 h-44 space-y-4'>

            {mode === "success" ? (
                <>
                    <Image alt="video" src={success} width={50} />
                    <p className='text-xl'>
                        Successfully Added
                    </p>

                    < FullButton button_name="Back" />
                </>) :
                <>
                    <Image alt="video" src={failure} width={50} />
                    <p className='text-xl'>
                        Failed
                    </p>

                    < FullButton button_name="Back" />
                </>
            }
        </div>

    )
}

export default Prompts