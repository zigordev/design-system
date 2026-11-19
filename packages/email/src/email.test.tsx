import { render } from '@react-email/render';
import { describe, expect, it } from 'vitest';
import { EmailButton, EmailFooter, EmailHeading, EmailLayout, EmailText } from './email.tsx';
import { themes } from './generated/themes.ts';

function Example({ product }: { product: 'cv' | 'gpool' }) {
  return (
    <EmailLayout
      product={product}
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
    const html = await render(<Example product="cv" />);
    expect(html).toContain('lang="es"');
    expect(html).toContain('Tienes un mensaje nuevo');
    expect(html).toContain('Mensaje nuevo');
    expect(html).toContain('href="https://example.com/messages/1"');
    expect(html).toContain('Recibes este correo por tu cuenta.');
  });

  it('paints the button in the product accent with the product radius', async () => {
    const cv = await render(<Example product="cv" />);
    const gpool = await render(<Example product="gpool" />);
    expect(cv).toContain(themes.cv.colors.accent);
    expect(gpool).toContain(themes.gpool.colors.accent);
    expect(gpool).toContain(`border-radius:${themes.gpool.radius.button}`);
  });

  it('falls back to the cv theme', async () => {
    const html = await render(
      <EmailLayout>
        <EmailText>Hola</EmailText>
      </EmailLayout>
    );
    expect(html).toContain(themes.cv.colors.page);
    expect(html).toContain('lang="en"');
  });
});
