import { Editor } from '@/components/Editor/Editor'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { JournalEntry } from '@/types'

const getEntry = async (id: string): Promise<JournalEntry | null> => {
  const user = await getUserByClerkId()
  return prisma.journalEntry.findUnique({
    where: {
      id,
      userId: String(user.id),
    },
    include: {
      analysis: true,
    },
  })
}
const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id)

  return (
    <div className="w-full h-full">
      {entry ? <Editor entry={entry} /> : null}
    </div>
  )
}
export default EntryPage
