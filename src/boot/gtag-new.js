import { defineBoot } from '#q-app/wrappers'

export default defineBoot(({ router }) => {
  const GA_ID = 'G-J804FB6D1E'

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function () {
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())

  window.gtag('config', GA_ID, {
    send_page_view: false,
  })

  const sendPageView = (url) => {
    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.origin + url,
      page_title: document.title,
    })
  }

  router.isReady().then(() => {
    sendPageView(router.currentRoute.value.fullPath)

    router.afterEach((to) => {
      sendPageView(to.fullPath)
    })
  })
})
