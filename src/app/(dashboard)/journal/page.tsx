import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { EntryCard } from '@/components/EntryCard'
import { NewEntryCard } from '@/components/NewEntryCard'
import Link from 'next/link'
import { analyze } from '../../../utils/ai'

const getJournals = async () => {
  const user = await getUserByClerkId({})

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: String(user.id),
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
  return entries
}
const JournalPage = async () => {
  const journalEntries = await getJournals()

  return (
    <section className="p-6">
      <h2 className="text-3xl mb-8 ">Journal</h2>
      <div className="grid grid-cols-3 gap-4 ">
        <NewEntryCard />
        {journalEntries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </section>
  )
}

export default JournalPage
