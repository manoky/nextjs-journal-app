import { NextRequest, NextResponse } from 'next/server'
import { getUserByClerkId } from '@/utils/auth'
import { prisma } from '@/utils/db'

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

  return NextResponse.json({ data: updatedEntry })
}
