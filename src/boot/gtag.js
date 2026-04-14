import { defineBoot } from '#q-app/wrappers'
import { createGtag } from 'vue-gtag'

export default defineBoot(({ app, router }) => {
  const gtag = createGtag({
    tagId: 'G-D644CSN7TQ',
    pageTracker: {
      router
    }
  })

  app.use(gtag)
})