import { NextResponse } from 'next/server'

export function ok(data, init = {}) {
  return NextResponse.json({ success: true, data }, init)
}

export function created(data) {
  return ok(data, { status: 201 })
}

export function fail(message, status = 400, details) {
  return NextResponse.json({ success: false, message, ...(details ? { details } : {}) }, { status })
}

export function fromError(error) {
  const message = error?.message || 'Unexpected server error'
  const status = /not found/i.test(message) ? 404 : 500
  return fail(message, status)
}
