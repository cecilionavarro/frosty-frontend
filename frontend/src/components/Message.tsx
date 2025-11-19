import { cn } from "@/lib/utils"

type MessageProps = {
  content: string
  role: "user" | "assistant"
}

const Message = ({ content, role }: MessageProps) => {
  const isUser = role === "user"

  return (
    <div className="max-w-4xl mx-auto">
      <div className={cn("flex w-full py-8",
        isUser ? "justify-end" : "justify-start"
      )}>
        <div className={cn("whitespace-pre-wrap",
          isUser ? "bg-blue-500 p-2 rounded-xl max-w-[75%]" : ""
        )}>
          {role}
          {content}
        </div>
      </div>
    </div>
  )
}

export default Message

// const Message = ({ content, role }: MessageProps) => {
//   return (
//     <div className="max-w-4xl mx-auto px-4 py-3">
//       <div
//         className={cn(
//           "rounded-lg p-3 text-sm",
//           role === "user"
//             ? "bg-primary text-primary-foreground ml-auto max-w-[80%]"
//             : "bg-muted max-w-full"
//         )}
//       >
//         {content}
//       </div>
//     </div>
//   )
// }

// export default Message


// const Message = ({ content, role }: MessageProps) => {
//   return (
//     <div
//       className={cn(
//         "w-full px-4 py-6",
//         role === "assistant" && "bg-muted/50"
//       )}
//     >
//       <div className="max-w-4xl mx-auto">
//         <div className="text-sm whitespace-pre-wrap">
//           {content}
//         </div>
//       </div>
//     </div>
//   )
// }