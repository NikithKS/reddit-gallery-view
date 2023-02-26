import { Text } from "@chakra-ui/react";


const ShowMessage = ({ msg }) => {
    return (
        <h2 className="message-container">{msg}</h2>
    )
}


export default ShowMessage;