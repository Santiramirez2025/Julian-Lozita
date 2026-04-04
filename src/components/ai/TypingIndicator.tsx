export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      <div className="w-2 h-2 rounded-full bg-text-light/40 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-text-light/40 typing-dot" />
      <div className="w-2 h-2 rounded-full bg-text-light/40 typing-dot" />
    </div>
  )
}
