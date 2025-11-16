import { ArrowUpIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group"
import { useState } from "react"

import axios from 'axios'


const PromptInput = () => {
    const [message, setMessage] = useState("")
    const [response, setResponse] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        console.log(value)
        setMessage(value)
    }
    const handleSend = async () => {
        console.log('sent!!')
        if (!message.trim()) return
        try {
            const res = await axios.post('http://127.0.0.1:8000/echo', { message });
            setResponse(res.data.reply);
            console.log("Server reply: ", res.data.reply)
            setMessage("")
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <InputGroup >
            <InputGroupInput
                placeholder="Ask Frosty"
                onChange={handleChange}
                value={message}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <InputGroupAddon align="inline-end">
                <InputGroupButton
                    variant='default'
                    className="rounded-full"
                    size='icon-xs'
                    disabled={!message.trim()}
                    onClick={handleSend}>
                    <ArrowUpIcon />
                    <span className="sr-only">Send</span>
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    )
}

export default PromptInput