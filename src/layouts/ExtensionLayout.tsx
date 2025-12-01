import type { PropsWithChildren } from 'react'

const ExtensionLayout = ({ children }: PropsWithChildren) => {
  return <div className="min-h-full bg-slate-900 text-white">{children}</div>
}

export default ExtensionLayout


