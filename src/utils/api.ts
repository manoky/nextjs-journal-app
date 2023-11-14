const createURL = (path: string) => window.location.origin + path
export const createNewEntry = async () => {
  const res = await fetch(new Request(createURL('/api/journal')), {
    method: 'POST',
  })

  if (!res.ok) {
    throw new Error('something went wrong!')
  }

  const data = await res.json()
  return data.data
}

export const updateEntry = async (id: string, content: string) => {
  const res = await fetch(new Request(createURL(`/api/journal/${id}`)), {
    method: 'PATCH',
    body: JSON.stringify({ content }),
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
  })

  if (!res.ok) {
    throw new Error('Something went wrong!')
  }

  const resData = await res.json()
  return resData.data
}
