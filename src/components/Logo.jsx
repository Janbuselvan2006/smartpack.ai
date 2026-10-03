import { Leaf } from 'lucide-react'

export default function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 text-white">
        <Leaf className="h-5 w-5" />
      </span>
      {!compact && (
        <span className="text-lg font-semibold tracking-tight text-slate-900">
          PackSmart <span className="text-green-600">AI</span>
        </span>
      )}
    </div>
  )
}
