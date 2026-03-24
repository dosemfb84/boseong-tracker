import { useState, useCallback } from 'react'

const STORAGE_KEY = (userId) => `workout_edits_${userId}`

function loadEdits(userId) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(userId))
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveEdits(userId, edits) {
  localStorage.setItem(STORAGE_KEY(userId), JSON.stringify(edits))
}

export function useWorkoutEdits(userId) {
  const [workoutEdits, setWorkoutEdits] = useState(() => loadEdits(userId))

  const saveWorkoutEdit = useCallback((runKey, fields) => {
    setWorkoutEdits(prev => {
      const next = { ...prev, [runKey]: { ...(prev[runKey] || {}), ...fields } }
      saveEdits(userId, next)
      return next
    })
  }, [userId])

  const clearWorkoutEdit = useCallback((runKey) => {
    setWorkoutEdits(prev => {
      const next = { ...prev }
      delete next[runKey]
      saveEdits(userId, next)
      return next
    })
  }, [userId])

  return { workoutEdits, saveWorkoutEdit, clearWorkoutEdit }
}
