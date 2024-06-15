

const FullButton = (props) => {
    return (
        <button
            className="text-white bg-violet-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center outline-none" type="button"
            {...props}
        >
            {props.button_name}
        </button>
    )
}

export default FullButton