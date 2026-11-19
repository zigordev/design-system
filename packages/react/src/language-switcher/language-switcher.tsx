import { classNames } from '../internal/class-names.ts';
import { Link } from '../link/link.tsx';

export interface LanguageOption {
  code: string;
  name: string;
  href: string;
}

export interface LanguageSwitcherProps {
  label: string;
  languages: LanguageOption[];
  current: string;
  display?: 'code' | 'name';
  className?: string;
}

export function LanguageSwitcher({
  label,
  languages,
  current,
  display = 'code',
  className,
}: LanguageSwitcherProps) {
  return (
    <nav aria-label={label} className={classNames('ds-language-switcher', className)}>
      {languages.map(({ code, name, href }) => (
        <Link
          key={code}
          href={href}
          hrefLang={code}
          lang={code}
          aria-current={code === current ? 'true' : undefined}
          tone="neutral"
          underline="hover"
        >
          {display === 'code' ? (
            <>
              {code.toUpperCase()}
              <span className="ds-visually-hidden"> {name}</span>
            </>
          ) : (
            name
          )}
        </Link>
      ))}
    </nav>
  );
}
