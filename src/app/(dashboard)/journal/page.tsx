import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { EntryCard } from '@/components/EntryCard'
import { NewEntryCard } from '@/components/NewEntryCard'

const getJournals = async () => {
  const user = await getUserByClerkId({})
  return prisma.journalEntry.findMany({
    where: {
      userId: String(user.id),
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}
const JournalPage = async () => {
  const journalEntries = await getJournals()

  return (
    <section className="p-6">
      <h2 className="text-3xl mb-8 ">Journal</h2>
      <div className="grid grid-cols-3 gap-4 ">
        <NewEntryCard />
        {journalEntries.map((entry) => (
          <EntryCard entry={entry} key={entry.id} />
        ))}
      </div>
    </section>
  )
}

export default JournalPage
