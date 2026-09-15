import express from 'express'
import cors from 'cors'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { portfolio } from '../lib/portfolio.js'

const app = express()
const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
app.use(cors())
app.use(express.json())

const messages = []

app.get('/api/portfolio', (_req, res) => res.json(portfolio))
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body ?? {}
  if (![name, email, message].every(value => typeof value === 'string' && value.trim())) {
    return res.status(400).json({ error: 'Please complete every field.' })
  }
  messages.push({ id: crypto.randomUUID(), name: name.trim(), email: email.trim(), message: message.trim(), receivedAt: new Date().toISOString() })
  res.status(201).json({ ok: true, message: 'Thanks — your note is on its way.' })
})
app.get('/api/health', (_req, res) => res.json({ status: 'ok', messages: messages.length }))

app.use(express.static(path.join(rootDirectory, 'dist')))

const port = process.env.PORT || 4000
app.listen(port, '0.0.0.0', () => console.log(`Portfolio ready on port ${port}`))
