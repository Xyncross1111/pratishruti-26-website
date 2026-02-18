'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/header'
import DeepSeaFooter from '@/components/atlantis/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  registrationEvents,
  getEventFromParam,
  type FormField,
  type RegistrationEvent,
} from '@/lib/events'

function getInitialFormState(fields: FormField[]): Record<string, string> {
  return Object.fromEntries(fields.map((f) => [f.id, '']))
}

function RegisterForm({ event }: { event: RegistrationEvent }) {
  const [form, setForm] = useState<Record<string, string>>(() =>
    getInitialFormState(event.formFields)
  )
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string>('')
  const [success, setSuccess] = useState(false)

  const updateField = (id: string) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [id]: e.target.value }))
    }

  const setFieldValue = (id: string) => (value: string) => {
    setForm((prev) => ({ ...prev, [id]: value }))
    }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage('')

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ eventId: event.id, ...form }),
      })

      const data = (await res.json().catch(() => null)) as { error?: string } | null

      if (!res.ok) {
        setMessage(data?.error ?? 'Registration failed')
        return
      }

      setSuccess(true)
      setMessage(`Registered for ${event.name}`)
      setForm(getInitialFormState(event.formFields))
    } catch {
      setMessage('Registration failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form className="grid gap-5" onSubmit={onSubmit}>
      {event.formFields.map((field) => (
        <div key={field.id} className="grid gap-2">
          <Label htmlFor={field.id}>
            {field.label}
            {field.required ? ' *' : ''}
          </Label>
          {field.type === 'textarea' ? (
            <Textarea
              id={field.id}
              name={field.id}
              value={form[field.id] ?? ''}
              onChange={updateField(field.id)}
              required={field.required}
              placeholder={
                field.id === 'actDescription'
                  ? 'What will you perform? Keep it short – 3–4 lines.'
                  : undefined
              }
            />
          ) : field.type === 'select' && field.options?.length ? (
            <Select
              value={form[field.id] ?? ''}
              onValueChange={setFieldValue(field.id)}
              required={field.required}
            >
              <SelectTrigger id={field.id} className="w-full">
                <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : field.type === 'radio' && field.options?.length ? (
            <RadioGroup
              name={field.id}
              value={form[field.id] ?? ''}
              onValueChange={setFieldValue(field.id)}
              className="flex flex-wrap gap-4"
            >
              {field.options.map((opt) => (
                <div key={opt} className="flex items-center gap-2">
                  <RadioGroupItem value={opt} id={`${field.id}-${opt}`} />
                  <Label htmlFor={`${field.id}-${opt}`} className="font-normal cursor-pointer">
                    {opt}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          ) : (
            <Input
              id={field.id}
              name={field.id}
              type={field.type === 'number' ? 'number' : field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
              autoComplete={
                field.id === 'email' ? 'email' : field.id === 'fullName' || field.id === 'name' ? 'name' : undefined
              }
              inputMode={field.type === 'tel' ? 'tel' : field.type === 'number' ? 'numeric' : undefined}
              value={form[field.id] ?? ''}
              onChange={updateField(field.id)}
              required={field.required}
              placeholder={
                field.id === 'actDuration' ? 'e.g. 2–3 min' : undefined
              }
            />
          )}
        </div>
      ))}

      <CardFooter className="px-0">
        <Button type="submit" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Register'}
        </Button>
      </CardFooter>

      {message ? (
        <p
          className={`text-sm ${success ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}
        >
          {message}
        </p>
      ) : null}
    </form>
  )
}

function RegisterContent() {
  const searchParams = useSearchParams()
  const eventParam = searchParams.get('event')
  const event = useMemo(() => getEventFromParam(eventParam), [eventParam])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Registration</CardTitle>
        <CardDescription>
          {event
            ? `Register for ${event.name}.`
            : 'Select an event to register.'}
        </CardDescription>
      </CardHeader>

      <CardContent>
        {event ? (
          <RegisterForm event={event} />
        ) : (
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              Choose an event from the homepage or use one of the links below.
            </p>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {registrationEvents.map((e) => (
                <li key={e.id}>
                  <Link
                    href={`/register?event=${e.id}`}
                    className="text-accent hover:underline"
                  >
                    {e.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function RegisterFallback() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Event Registration</CardTitle>
        <CardDescription>Loading…</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">Loading events…</p>
      </CardContent>
    </Card>
  )
}

export default function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden footer-bg-texture">
      <Header />

      <main className="mx-auto w-full max-w-2xl px-6 pt-28 pb-16">
        <Suspense fallback={<RegisterFallback />}>
          <RegisterContent />
        </Suspense>
      </main>

      <DeepSeaFooter />
    </div>
  )
}
