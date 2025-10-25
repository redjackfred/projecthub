'use client'
import { signin } from '@/lib/actions'
import { Button } from './ui/button'
import { useActionState } from 'react'


export function SigninForm() {
  const [state, action, pending] = useActionState(signin, undefined)

  return (
    <form action={action}>
      <div>
        <label htmlFor="email">Email: </label>
        <input id="email" name="email" placeholder="Email" />
        {state && state.errors?.email && (
          <div className="text-red-400">{state.errors.email.join(', ')}</div>
        )}
      </div>
      <div>
        <label htmlFor="password">Password: </label>
        <input id="password" name="password" type="password" />
        {state?.errors?.password && (
          <div>
            <p>Passord must:</p>
            <ul>
              {
                state.errors.password.map((err) => (
                  <li key={err} className="text-red-400">{err}</li>
                ))
              }
            </ul>
          </div>
        )}
      </div>
      <Button disabled={pending} type='submit'>Sign In</Button>
      {state && state.message && (
        <div className="text-green-400">{state.message}</div>
      )}
      {state && state.errors && (
        <div className="text-red-400">Sign in failed. Please check your credentials.</div>
      )}
    </form>
  )
}

