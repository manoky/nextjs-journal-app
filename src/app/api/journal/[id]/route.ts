import { NextRequest, NextResponse } from 'next/server'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { analyze } from '@/utils/ai'
import { revalidatePath } from 'next/cache'

export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { content } = await req.json()
  const user = await getUserByClerkId({})
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId: String(user.id),
      id: params.id,
    },
    data: {
      content: content,
    },
  })

  const analysis = await analyze(updatedEntry.content)

  if (analysis) {
    await prisma.analysis.upsert({
      where: {
        entryId: updatedEntry.id,
      },
      create: {
        entryId: updatedEntry.id,
        ...analysis,
      },
      update: {
        ...analysis,
      },
    })
  }

  return NextResponse.json({ data: { ...updatedEntry, analysis } })
}
