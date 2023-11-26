'use client'

import { FormEvent, useState } from 'react'
import { askQuestion } from '@/utils/api'

export const Question = () => {
  const [value, setValue] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    const res = await askQuestion(value)
    console.log(res)
    setAnswer(res)
    setLoading(false)
    setValue('')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          placeholder="Ask a question"
          onChange={(e) => setValue(e.target.value)}
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
          disabled={loading}
        />

        <button
          className="bg-blue-400 px-6 py-2 rounded-lg text-lg ml-2"
          disabled={loading}
        >
          Ask
        </button>
      </form>
      {loading && <div>Loading...</div>}
      {!!answer && <div>{answer}</div>}
    </div>
  )
}
