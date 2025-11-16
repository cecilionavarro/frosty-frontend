import { cn } from "@/lib/utils"

type MessageProps = {
  content: string
  role: "user" | "assistant"
}

const Message = ({ content, role }: MessageProps) => {
  return (
    <div
      className={cn(
        "w-full px-4 py-6",
        role === "assistant" && "bg-muted/50"
      )}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-sm whitespace-pre-wrap">
          {content}
        </div>
      </div>
    </div>
  )
}

export default Message