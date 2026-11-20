import { createContext, type ReactNode, useContext } from 'react';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from 'react-email';
import type { EmailTheme } from './build/themes.ts';
import { themes } from './generated/themes.ts';

export type EmailProduct = keyof typeof themes;

const ThemeContext = createContext<EmailTheme>(themes.cv);

function useTheme(): EmailTheme {
  return useContext(ThemeContext);
}

export interface EmailLayoutProps {
  product?: EmailProduct;
  lang?: string;
  preview?: string;
  footer?: ReactNode;
  children: ReactNode;
}

export function EmailLayout({
  product = 'cv',
  lang = 'en',
  preview,
  footer,
  children,
}: EmailLayoutProps) {
  const theme = themes[product];
  return (
    <Html lang={lang} dir="ltr">
      <Head />
      {preview ? <Preview>{preview}</Preview> : null}
      <ThemeContext.Provider value={theme}>
        <Body
          style={{
            margin: 0,
            backgroundColor: theme.colors.page,
            color: theme.colors.text,
            fontFamily: theme.font,
          }}
        >
          <Container
            style={{
              maxWidth: theme.width,
              margin: '0 auto',
              padding: `${theme.space.lg} ${theme.space.md}`,
            }}
          >
            <Section
              style={{
                backgroundColor: theme.colors.raised,
                border: `1px solid ${theme.colors.border}`,
                borderRadius: theme.radius.card,
                padding: theme.space.lg,
              }}
            >
              {children}
            </Section>
            {footer}
          </Container>
        </Body>
      </ThemeContext.Provider>
    </Html>
  );
}

export function EmailHeading({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <Heading
      as="h1"
      style={{
        margin: `0 0 ${theme.space.md}`,
        color: theme.colors.text,
        fontSize: theme.fontSize.xl,
        lineHeight: '1.3',
      }}
    >
      {children}
    </Heading>
  );
}

export function EmailText({
  children,
  tone = 'default',
}: {
  children: ReactNode;
  tone?: 'default' | 'muted';
}) {
  const theme = useTheme();
  return (
    <Text
      style={{
        margin: `0 0 ${theme.space.md}`,
        color: tone === 'muted' ? theme.colors.muted : theme.colors.text,
        fontSize: theme.fontSize.md,
        lineHeight: '1.5',
      }}
    >
      {children}
    </Text>
  );
}

export function EmailButton({ href, children }: { href: string; children: ReactNode }) {
  const theme = useTheme();
  return (
    <Button
      href={href}
      style={{
        display: 'inline-block',
        padding: `${theme.space.sm} ${theme.space.md}`,
        borderRadius: theme.radius.button,
        backgroundColor: theme.colors.accent,
        color: theme.colors.accentOn,
        fontSize: theme.fontSize.md,
        fontWeight: 600,
        textDecoration: 'none',
      }}
    >
      {children}
    </Button>
  );
}

export function EmailFooter({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return (
    <>
      <Hr
        style={{
          margin: `${theme.space.lg} 0 ${theme.space.md}`,
          borderColor: theme.colors.border,
        }}
      />
      <Text
        style={{
          margin: 0,
          color: theme.colors.muted,
          fontSize: theme.fontSize.sm,
          textAlign: 'center',
        }}
      >
        {children}
      </Text>
    </>
  );
}
