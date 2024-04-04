type MsgType = {
    msg: string
}
const Notification = ({ msg }: MsgType) => {
    return (
        <div>
            <p>{msg}</p>
        </div>
    )
}

export default Notification