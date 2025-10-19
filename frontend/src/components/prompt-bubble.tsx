export function PromptBubble({ text }: { text: string }) {
  return (
    <div className="flex w-full justify-end">
      <div className="max-w-[60ch] rounded-3xl bg-primary px-4 py-3 text-left text-primary-foreground shadow-md">
        {text}
      </div>
    </div>
  )
}
