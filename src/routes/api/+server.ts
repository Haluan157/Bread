export const GET = () => {
  return new Response(`
    <a href="/">Kembali ke halaman awal sono!</a>
  `, {
    status: 401,
    headers: {
      'Content-Type': "text/html"
    }
  })
}