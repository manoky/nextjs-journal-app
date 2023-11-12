import { prisma } from '@/utils/db'
import { currentUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'

const createNewUser = async () => {
  const user = await currentUser()
  if (!user) return null
  const { id: clerkId, emailAddresses } = user
  const match = await prisma.user.findUnique({
    where: { clerkId },
  })

  if (!match) {
    const newUser = await prisma.user.create({
      data: {
        clerkId,
        email: String(emailAddresses[0].emailAddress),
      },
    })
  }

  redirect('/journal')
}

const NewUser = async () => {
  await createNewUser()
  return <div>Hi</div>
}

export default NewUser
