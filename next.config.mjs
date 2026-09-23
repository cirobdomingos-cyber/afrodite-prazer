/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  redirects: async () => [
    { source: "/produtos", destination: "/#cuidar", permanent: true },
    // O ebook é um HTML estático em /public; o endereço curto abre direto em tela cheia.
    { source: "/as-7-etapas", destination: "/as-7-etapas.html", permanent: false },
  ],
};

export default nextConfig;
