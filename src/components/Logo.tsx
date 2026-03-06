import { Link } from 'react-router-dom';
import logoSrc from '@/assets/logo.jpeg';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const sizes = { sm: 'h-8 w-8', md: 'h-12 w-12', lg: 'h-20 w-20' };

const Logo = ({ className = '', size = 'md', showText = true }: LogoProps) => (
  <Link to="/" className={`flex items-center gap-3 hover:opacity-90 transition-opacity ${className}`}>
    <img
      src={logoSrc}
      alt="ABX Tech Schools logo"
      className={`${sizes[size]} rounded-md object-contain`}
    />
    {showText && (
      <span className="font-bold text-lg tracking-tight text-foreground">
        ABX Tech Schools
      </span>
    )}
  </Link>
);

export default Logo;
