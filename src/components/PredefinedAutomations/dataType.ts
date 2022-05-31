interface Categories {
  title: string
  slug: string
}
interface Sites {
  logoSmall2x: string
  domains: string[]
  title: string
  slug: string
}

interface dataType {
  id: string
  title: string
  shortDescription: string
  slug: string
  priority: number
  categories: Categories[]
  sites: Sites[]
}

export default dataType
