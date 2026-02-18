import { NextResponse } from 'next/server'
import { google } from 'googleapis'
import {
  getEventById,
  eventNameToSheetName,
  type RegistrationEvent,
  type FormField,
} from '@/lib/events'

type RegisterPayload = {
  eventId?: number | string
  [key: string]: unknown
}

function validatePayload(
  payload: RegisterPayload,
  event: RegistrationEvent
): { ok: true; values: string[] } | { ok: false; error: string } {
  const values: string[] = []
  for (const field of event.formFields) {
    const raw = payload[field.id]
    const value = raw == null ? '' : String(raw).trim()
    if (field.required && !value) {
      return { ok: false, error: `Missing required field: ${field.label}` }
    }
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { ok: false, error: 'Invalid email address' }
    }
    values.push(value)
  }
  return { ok: true, values }
}

function getAuth() {
  const json = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (json) {
    try {
      const credentials = JSON.parse(json) as Record<string, unknown>
      return new google.auth.GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      })
    } catch {
      return null
    }
  }
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return new google.auth.GoogleAuth({
      keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    })
  }
  return null
}

async function ensureSheetAndAppend(
  spreadsheetId: string,
  sheetTitle: string,
  headers: string[],
  rowValues: string[]
): Promise<{ ok: true } | { ok: false; error: string }> {
  const auth = getAuth()
  if (!auth) {
    return { ok: false, error: 'Google Sheets not configured' }
  }

  const sheets = google.sheets({ version: 'v4', auth })

  // Get spreadsheet metadata to find or create the sheet
  const spreadsheet = await sheets.spreadsheets.get({
    spreadsheetId,
  })

  const sheet = spreadsheet.data.sheets?.find(
    (s) => s.properties?.title === sheetTitle
  )
  let sheetId = sheet?.properties?.sheetId

  if (sheetId == null) {
    // Create new sheet with this title
    const addSheet = await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [
          {
            addSheet: {
              properties: { title: sheetTitle },
            },
          },
        ],
      },
    })
    const newSheetId = addSheet.data.replies?.[0]?.addSheet?.properties?.sheetId
    if (newSheetId == null) {
      return { ok: false, error: 'Failed to create sheet' }
    }
    sheetId = newSheetId
  }

  const range = `'${sheetTitle}'!A:Z`
  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `'${sheetTitle}'!A1:${String.fromCharCode(64 + headers.length)}1`,
  }).catch(() => ({ data: { values: undefined } }))

  const firstRow = existing.data.values?.[0]
  const hasHeader = firstRow && firstRow.some((c) => String(c).trim() !== '')

  if (!hasHeader) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `'${sheetTitle}'!A1:${String.fromCharCode(64 + headers.length)}1`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [headers] },
    })
  }

  const colEnd = headers.length <= 26 ? String.fromCharCode(64 + headers.length) : 'Z'
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `'${sheetTitle}'!A:${colEnd}`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: { values: [rowValues] },
  })

  return { ok: true }
}

export async function POST(req: Request) {
  let payload: RegisterPayload | null = null

  try {
    payload = (await req.json()) as RegisterPayload
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid JSON body' },
      { status: 400 },
    )
  }

  const eventId = payload?.eventId
  const event =
    eventId !== undefined && eventId !== null
      ? getEventById(eventId)
      : undefined

  if (!event) {
    return NextResponse.json(
      { ok: false, error: 'Invalid or missing event' },
      { status: 400 },
    )
  }

  const validation = validatePayload(payload, event)
  if (!validation.ok) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 },
    )
  }

  const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID
  if (!spreadsheetId) {
    return NextResponse.json(
      { ok: false, error: 'Registration not configured' },
      { status: 503 },
    )
  }

  const sheetTitle = eventNameToSheetName(event.name)
  const headers = event.formFields.map((f: FormField) => f.label)
  const result = await ensureSheetAndAppend(
    spreadsheetId,
    sheetTitle,
    headers,
    validation.values,
  )

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true })
}
