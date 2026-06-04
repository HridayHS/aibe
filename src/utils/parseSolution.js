/**
 * Parse a flat solution string into structured steps.
 * Handles formats like "Step 1: Title. Body text Step 2: ..."
 */
export function parseSolution(text) {
  if (!text) return []
  const stepRegex = /Step\s+(\d+)\s*:\s*([^.]*(?:\.\s*)?)?([\s\S]*?)(?=Step\s+\d+\s*:|$)/gi
  const steps = []
  let match
  while ((match = stepRegex.exec(text)) !== null) {
    const stepNum = match[1]
    const title = (match[2] || '').trim().replace(/\.\s*$/, '')
    const body = (match[3] || '').trim()
    if (title || body) {
      steps.push({ stepNum, title, body })
    }
  }
  if (steps.length === 0) {
    return [{ stepNum: null, title: null, body: text.trim() }]
  }
  return steps
}
