import { Box, Button, Input, InputGroup, InputLeftAddon, Select } from "@chakra-ui/react"
import { useRef, useState } from "react";



const SubSelect = ({ subInfo, setSub }) => {

    const [subIn, setSubIn] = useState({...subInfo});

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(subIn);
        setSub({...subIn});
    }

    const handleChange =(e) => {
        setSubIn({...subIn, [e.target.name]:e.target.value});
    }

    return (
        <form>
            <Box border='2px' borderRadius='6px' margin={2} display='flex' alignItems='center' justifyContent='space-around' padding={2}>
                <InputGroup margin='2'>
                    <InputLeftAddon children='r/' />
                    <Input onChange={handleChange} name='sub' value={subIn.sub} placeholder="subreddit" />
                </InputGroup>
                <Select onChange={handleChange} name='sort' value={subIn.sort} variant='filled' margin='2'>
                    <option value='hot'>Hot</option>
                    <option value='new'>New</option>
                </Select>
                <Button type="submit" onClick={handleSubmit} variant='outline' margin='2'>Go!</Button>
            </Box>
        </form>
    )

}


export default SubSelect;