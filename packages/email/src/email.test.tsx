import { render } from '@react-email/render';
import { describe, expect, it } from 'vitest';
import { EmailButton, EmailFooter, EmailHeading, EmailLayout, EmailText } from './email.tsx';
import { theme } from './generated/theme.ts';

function Example() {
  return (
    <EmailLayout
      lang="es"
      preview="Tienes un mensaje nuevo"
      footer={<EmailFooter>Recibes este correo por tu cuenta.</EmailFooter>}
    >
      <EmailHeading>Mensaje nuevo</EmailHeading>
      <EmailText>Ada te ha escrito.</EmailText>
      <EmailText tone="muted">Responde en dos días.</EmailText>
      <EmailButton href="https://example.com/messages/1">Leer el mensaje</EmailButton>
    </EmailLayout>
  );
}

describe('EmailLayout', () => {
  it('renders the language, the preview text, the content and the footer', async () => {
    const html = await render(<Example />);
    expect(html).toContain('lang="es"');
    expect(html).toContain('Tienes un mensaje nuevo');
    expect(html).toContain('Mensaje nuevo');
    expect(html).toContain('href="https://example.com/messages/1"');
    expect(html).toContain('Recibes este correo por tu cuenta.');
  });

  it('paints the page and the button from the light theme', async () => {
    const html = await render(<Example />);
    expect(html).toContain(theme.colors.page);
    expect(html).toContain(theme.colors.accent);
    expect(html).toContain(`border-radius:${theme.radius.button}`);
  });

  it('defaults to English without a preview or a footer', async () => {
    const html = await render(
      <EmailLayout>
        <EmailText>Hola</EmailText>
      </EmailLayout>
    );
    expect(html).toContain('lang="en"');
    expect(html).not.toContain('Recibes este correo');
  });
});
