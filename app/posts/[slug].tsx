import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { useLoader } from 'one'
import { Text, View } from 'react-native'
import { components } from '~/features/mdx-components'

type Frontmatter = {
  title: string
  description?: string
  date?: string
  slug: string
}

type LoaderData = {
  frontmatter: Frontmatter
  code: string
}

export async function generateStaticParams() {
  const { getAllFrontmatter } = await import('@vxrn/mdx')
  const frontmatters = getAllFrontmatter('data/posts') as Frontmatter[]
  return frontmatters.map(({ slug }) => ({
    slug: slug.replace(/.*posts\//, ''),
  }))
}

export async function loader({ params }: { params: { slug: string } }): Promise<LoaderData> {
  const { getMDXBySlug } = await import('@vxrn/mdx')
  const { frontmatter, code } = await getMDXBySlug('data/posts', params.slug)
  return {
    frontmatter: frontmatter as Frontmatter,
    code,
  }
}

export default function PostPage() {
  const { code, frontmatter } = useLoader(loader)
  const Component = useMemo(() => getMDXComponent(code), [code])

  const formattedDate = frontmatter.date
    ? new Date(frontmatter.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <View style={{ padding: 20, maxWidth: 800, marginHorizontal: 'auto' }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 8 }}>
        {frontmatter.title}
      </Text>
      {formattedDate && (
        <Text style={{ fontSize: 14, color: '#666', marginBottom: 24 }}>
          {formattedDate}
        </Text>
      )}
      {frontmatter.description && (
        <Text style={{ fontSize: 18, color: '#444', marginBottom: 32, lineHeight: 28 }}>
          {frontmatter.description}
        </Text>
      )}
      <Component components={components} />
    </View>
  )
}
