import { ArrowUpIcon } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "./ui/input-group"
import { useState } from "react"


const PromptInput = () => {
    const [input, setInput] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        console.log(value)
        setInput(value)
    }
    return (
        <InputGroup>
            <InputGroupInput placeholder="Ask Frosty" onChange={handleChange} value={input} />
            <InputGroupAddon align="inline-end">
                <InputGroupButton
                    variant='default'
                    className="rounded-full"
                    size='icon-xs'
                    disabled={!input.trim()}>
                    <ArrowUpIcon />
                    <span className="sr-only">Send</span>
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    )
}

export default PromptInput