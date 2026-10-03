export default function Button({
  children,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const variants = {
    primary:
      'bg-green-600 text-white hover:bg-green-700 shadow-sm',
    secondary:
      'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50',
    ghost: 'text-green-700 hover:bg-green-50',
  }

  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition ${variants[variant]} disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
