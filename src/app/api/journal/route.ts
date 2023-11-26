import { analyze } from '@/utils/ai'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { Analysis } from '../../../types'

export const POST = async () => {
  const user = await getUserByClerkId()

  const entry = await prisma.journalEntry.create({
    data: {
      userId: String(user.id),
      content: 'Write about your day!',
    },
  })
  const analysis = await analyze(entry.content)

  await prisma.analysis.create({
    // @ts-ignore
    data: {
      entryId: entry.id,
      ...analysis,
    },
  })

  return NextResponse.json({ data: entry })
}
