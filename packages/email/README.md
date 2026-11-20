# @zigordev/email

Email components for zigordev apps, built with React Email on the design tokens. Apps render their messages with it and send them through `@zigordev/notifications-client`; notifications only delivers.

## Use

```bash
pnpm add @zigordev/email @react-email/render
```

```tsx
import { EmailButton, EmailFooter, EmailHeading, EmailLayout, EmailText } from '@zigordev/email';
import { render } from '@react-email/render';

const html = await render(
  <EmailLayout lang="es" preview={t('preview')} footer={<EmailFooter>{t('why')}</EmailFooter>}>
    <EmailHeading>{t('title')}</EmailHeading>
    <EmailText>{t('body')}</EmailText>
    <EmailButton href={link}>{t('open')}</EmailButton>
  </EmailLayout>
);
```

Email clients do not read CSS variables, so the components inline the light theme of the brand, generated from `@zigordev/tokens` and exported as `theme`. Run `pnpm --filter @zigordev/email run generate` after the tokens change.
