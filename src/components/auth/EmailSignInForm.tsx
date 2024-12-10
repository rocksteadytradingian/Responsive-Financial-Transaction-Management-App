import React from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

interface EmailSignInFormProps {
  email: string;
  password: string;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export function EmailSignInForm({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading
}: EmailSignInFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        required
        autoComplete="email"
        disabled={isLoading}
      />

      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        required
        autoComplete="current-password"
        disabled={isLoading}
      />

      <Button
        type="submit"
        className="w-full h-12"
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign in with Email'}
      </Button>
    </form>
  );
}