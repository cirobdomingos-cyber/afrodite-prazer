import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'As 7 Etapas do Autoconhecimento Íntimo — Afrodite · Prazer',
  description:
    'Um guia honesto pra mulher que quer se redescobrir — em qualquer idade, em qualquer fase.',
};

export default function GuiaPage() {
  return (
    <iframe
      src="/as-7-etapas.html"
      style={{
        width: '100%',
        height: '100vh',
        border: 'none',
        display: 'block',
      }}
      title="As 7 Etapas do Autoconhecimento Íntimo"
    />
  );
}
