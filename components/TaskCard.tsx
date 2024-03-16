import { useRouter } from 'next/navigation'

const TaskCard = ({ description, deadline, points, status }) => {
    // console.log(task);

    const router = useRouter()
    return (
        <div className="prompt_card">
            <div className="flex justify-between gap-5 items-center">
                <div
                    className="flex "
                // onClick={() => router.push(`/user?id=${prompt.creator._id}`)}
                >

                    <div className="flex flex-col">
                        <h3 className=" text-gray-50 ml-4 font-bold font-satoshi">
                            Task:{description}
                        </h3>
                        <p className="text-sm text-gray-50 ml-4 ">
                            Deadline:{deadline}
                        </p>

                        <p className="text-sm text-gray-50 ml-4 ">
                            Status:{status}
                        </p>
                        
                        <p className="text-sm text-gray-50 ml-4 ">
                            Point:{points}
                        </p>
                        <p className="text-sm text-gray-50 ml-4 ">
                            Picked By:
                        </p>
                        {/* <button className='bg-green-600 p-2 mb-3' onClick={() => router.push(`/task?id=${id}`)}>View Task</button> */}
                    </div>
                </div>

            </div>


            {/* {session?.user.id === prompt.creator._id && pathName === '/profile' && (
    <div className="mt-4 flex-center gap-4 border-t border-gray-100 p-3">
      <p
        className="cursor-pointer green_gradient font-inter"
        onClick={handleEdit}
      >
        edit
      </p>
      <p
        className="cursor-pointer orange_gradient font-inter"
        onClick={handleDelete}
      >
        delete
      </p>
    </div>
  )} */}
        </div>
    )
}

export default TaskCard