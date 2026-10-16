import { useEffect } from 'react'

const SITE = 'Quirky Fruity'
const DEFAULT_TITLE = `${SITE} · Fresh juices & smoothies`

// Sets the browser tab title for a page, e.g. "Menu - Quirky Fruity".
export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} - ${SITE}` : DEFAULT_TITLE
  }, [title])
}
