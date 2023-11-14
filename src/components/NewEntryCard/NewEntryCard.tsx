'use client'
import { ReactElement } from 'react'
import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

export const NewEntryCard = (): ReactElement => {
  const router = useRouter()
  const handleClick = async () => {
    try {
      const data = await createNewEntry()
      router.push(`/journal/${data.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="cursor-pointer overflow-hidden rounded-md bg-white shadow"
      onClick={handleClick}
    >
      <div className="px-4 py-5 sm:p-6" role="button">
        <span className="text-3xl">New entry</span>
      </div>
    </div>
  )
}
