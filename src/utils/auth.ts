import { auth } from '@clerk/nextjs'
import { prisma } from '@/utils/db'

type Props = {
  select?: any
}
export const getUserByClerkId = async ({ select }: Props) => {
  const { userId } = auth()

  return prisma.user.findUniqueOrThrow({
    where: {
      clerkId: String(userId),
    },
    select,
  })
}
