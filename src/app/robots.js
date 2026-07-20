export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.laticiniosvallys.com.br';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'], // Protege rotas de administração e APIs
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
