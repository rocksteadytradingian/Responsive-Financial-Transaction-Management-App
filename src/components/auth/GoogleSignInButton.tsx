import { Button } from '../ui/Button';
import { IoLogoGoogle } from 'react-icons/io5';

interface GoogleSignInButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function GoogleSignInButton({ onClick, disabled }: GoogleSignInButtonProps) {
  return (
    <Button
      type="button"
      variant="secondary"
      className="w-full flex items-center justify-center space-x-2 h-12"
      onClick={onClick}
      disabled={disabled}
    >
      <IoLogoGoogle className="w-5 h-5" />
      <span>Continue with Google</span>
    </Button>
  );
}