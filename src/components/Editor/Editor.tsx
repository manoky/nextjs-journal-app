'use client'

import { JournalEntry } from '@/types'
import { useState } from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'

export const Editor = ({ entry }: { entry: JournalEntry }) => {
  const [value, setValue] = useState(entry.content)
  const [isLoading, setIsLoading] = useState(false)
  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _value)
      setIsLoading(false)
    },
  })
  return (
    <div className="w-full h-full">
      {isLoading && <div>Loading...</div>}
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full h-full p-8 text-xl outline-none"
      />
    </div>
  )
}
