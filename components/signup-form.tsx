'use client'

import { useActionState } from 'react'
import { signup } from '@/lib/actions'
import { Button } from './ui/button'

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined)

  return (
    <form action={action}>
      <div>
        <label htmlFor="name">Name: </label>
        <input
          id="name"
          name="name"
          placeholder="Name"
          defaultValue={state?.data?.name}
        />
        {state && state.errors?.name && (
          <div className="text-red-400">{state.errors.name.join(', ')}</div>
        )}
      </div>
      <div>
        <label htmlFor="email">Email: </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          defaultValue={state?.data?.email}
        />
        {state && state.errors?.email && (
          <div className="text-red-400">{state.errors.email.join(', ')}</div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue={state?.data?.password}
        />
        {state?.errors?.password && (
          <div>
            <p className="text-red-400">Passord must:</p>
            <ul>
              {
                state.errors.password.map((err) => (
                  <li key={err} className="text-red-400"> - {err}</li>
                ))
              }
            </ul>
          </div>
        )}
      </div>
      <Button type='submit' disabled={pending}>Sign Up</Button>
    </form>
  )
}
