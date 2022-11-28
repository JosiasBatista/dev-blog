export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  const reqBody = JSON.parse(req.body.payload)
  const modifiedPosts = reqBody.commits[0].modified;

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    if (modifiedPosts.length > 0) {
      await res.revalidate(`/posts/${modifiedPosts[0].replace(/\.md$/, '')}`)
    }

    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({ requestBody: reqBody })
  }
}