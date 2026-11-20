# @zigordev/email

Email components for zigordev products, built with React Email on the design tokens. Products render their messages with it and send them through `@zigordev/notifications-client`; notifications only delivers.

## Use

```bash
pnpm add @zigordev/email @react-email/render
```

```tsx
import { EmailButton, EmailFooter, EmailHeading, EmailLayout, EmailText } from '@zigordev/email';
import { render } from '@react-email/render';

const html = await render(
  <EmailLayout
    product="gpool"
    lang="es"
    preview={t('preview')}
    footer={<EmailFooter>{t('why')}</EmailFooter>}
  >
    <EmailHeading>{t('title')}</EmailHeading>
    <EmailText>{t('body')}</EmailText>
    <EmailButton href={link}>{t('open')}</EmailButton>
  </EmailLayout>
);
```

Email clients do not read CSS variables, so the components inline each product's light theme, generated from `@zigordev/tokens`. Run `pnpm --filter @zigordev/email run generate` after the tokens change.
