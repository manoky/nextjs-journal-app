import { ReactElement, ReactNode } from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'

const links = [
  { href: '/', label: 'Home' },
  { href: '/journal', label: 'Journal' },
]
const DashBoardLayout = ({
  children,
}: {
  children: ReactNode
}): ReactElement => {
  return (
    <main className="h-screen w-screen relative bg-slate-100">
      <aside className="absolute w-[200px] top-0 left-0 h-full border-r border-black/10 px-2">
        <div>Mood</div>
        <ul>
          {links.map(({ href, label }) => (
            <li className="py-6 text-xl" key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10 shadow">
          <nav className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </nav>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </main>
  )
}

export default DashBoardLayout
