import { useState, type FormEvent } from "react"
import { ArrowUp } from "lucide-react"

import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type PromptComposerProps = {
  onSubmit: (value: string) => void
  isShifted?: boolean
}

export function PromptComposer({ onSubmit, isShifted }: PromptComposerProps) {
  const [value, setValue] = useState("")

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextValue = value.trim()
    if (!nextValue) return
    onSubmit(nextValue)
    setValue("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "w-full max-w-[75rem] px-20 transition-all duration-300 ease-out",
        isShifted ? "fixed bottom-[50px] left-1/2 -translate-x-1/2" : "mx-auto"
      )}
    >
      <div className="flex items-center overflow-hidden rounded-full border border-input bg-card pr-4 shadow-sm focus-within:ring-2 focus-within:ring-ring/40">
        <Input
          type="text"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder="Message Frosty"
          className="flex-1 border-0 px-5 py-6 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <Button
          type="submit"
          size="icon"
          className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <ArrowUp className="h-4 w-4 text-primary-foreground" />
        </Button>
      </div>
    </form>
  )
}
