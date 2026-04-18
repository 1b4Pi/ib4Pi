import { defineBoot } from '#q-app/wrappers'
import { createGtag } from 'vue-gtag'

export default defineBoot(({ app, router }) => {
  const gtag = createGtag({
    tagId: 'G-J804FB6D1E',
    pageTracker: {
      router,
    },
  })

  app.use(gtag)
})
