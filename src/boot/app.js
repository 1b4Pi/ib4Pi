import { boot } from 'quasar/wrappers'
import { dehydrate, hydrate } from '@tanstack/vue-query'
import { queryApp } from 'src/api/sanity/queries/app'
import { queryClient } from 'src/boot/vueQuery'
import { useAppStore } from 'src/stores/app'

export default boot(async ({ router, ssrContext, store }) => {
  const QKEY = 'app'
  const appStore = useAppStore(store)
  if (ssrContext) {
    try {
      await queryClient.prefetchQuery({
        queryKey: [QKEY],
        queryFn: queryApp,
      })
      appStore.app = queryClient.getQueryData([QKEY])
    } catch (error) {
      console.error('Failed to fetch app:', error.message)
    }
    ssrContext.initialState = { vueQueryState: dehydrate(queryClient) }
  } else {
    const initialState = window.__INITIAL_STATE__?.vueQueryState
    if (initialState) {
      hydrate(queryClient, initialState)
    }
  }
})
