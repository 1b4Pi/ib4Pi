import { defineBoot } from '#q-app/wrappers'
import { createGtag } from 'vue-gtag'

export default defineBoot(({ app, router }) => {
  const gtag = createGtag({
    tagId: 'G-Q9XE5WXW8M',
    pageTracker: {
      router,
    },
  })

  app.use(gtag)
})
