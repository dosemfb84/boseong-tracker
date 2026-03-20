import { useState, useEffect, useCallback } from 'react'

function loadFromStorage(userId) {
  try {
    const raw = localStorage.getItem(`completions_${userId}`)
    return raw ? new Set(JSON.parse(raw)) : new Set()
  } catch {
    return new Set()
  }
}

function saveToStorage(userId, set) {
  localStorage.setItem(`completions_${userId}`, JSON.stringify([...set]))
}

export function useCompletions(userId, friendId) {
  const [completions, setCompletions] = useState(new Set())
  const [friendCompletions, setFriendCompletions] = useState(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userId || !friendId) return
    setCompletions(loadFromStorage(userId))
    setFriendCompletions(loadFromStorage(friendId))
    setLoading(false)
  }, [userId, friendId])

  const toggleComplete = useCallback((runKey) => {
    setCompletions(prev => {
      const next = new Set(prev)
      if (next.has(runKey)) next.delete(runKey)
      else next.add(runKey)
      saveToStorage(userId, next)
      return next
    })
  }, [userId])

  return { completions, friendCompletions, toggleComplete, loading }
}
