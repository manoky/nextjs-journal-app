type BaseType = {
  id: string
  createdAt: Date
  updatedAt: Date
}

export type User = {
  clerkId: string
  email: string
  entries: JournalEntry[]
} & BaseType

export type JournalEntry = {
  userId: string
  content: string
  analysis: Analysis | null
} & BaseType

export type Analysis = {
  entryId: string
  mood: string
  summary: string
  color: string
  negative: boolean
  subject: string
  sentimentScore: number
} & BaseType
