import React from "react"
import Avatar from "react-avatar"

const Clients = ({username},) =>{
    return(
        <>
        <div>
            <Avatar name={username} size={50} round="14px" />
            <h4 className="text-xs text-neutral-400 flex justify-center">{username}</h4>
        </div>
        </>
    )
}

export default Clients