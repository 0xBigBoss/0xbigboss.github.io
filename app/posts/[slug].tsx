import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { useLoader } from 'one'
import { Text, View, Pressable } from 'react-native'
import { Link } from 'one'
import { components } from '~/features/mdx-components'

// Gothic color palette
const colors = {
  background: '#0a0a12',
  gold: '#c9a227',
  textPrimary: '#e8e8f0',
  textSecondary: '#a0a0b0',
}

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
    ? new Date(frontmatter.date + 'T12:00:00').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <View
      style={{
        flex: 1,
        minHeight: '100vh',
        backgroundColor: colors.background,
        paddingVertical: 60,
        paddingHorizontal: 20,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hero background image */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 400,
          // @ts-expect-error web style
          backgroundImage: 'url(/images/heroes/posts.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
        }}
      />
      {/* Gradient overlay */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // @ts-expect-error web style
          background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,18,0.9) 300px, rgba(10,10,18,1) 400px)',
          pointerEvents: 'none',
        }}
      />
      <View style={{ maxWidth: 700, marginHorizontal: 'auto', width: '100%', zIndex: 1 }}>
        {/* Back link */}
        <Link href="/posts" asChild>
          <Pressable style={{ marginBottom: 40 }}>
            <Text style={{ color: colors.gold, fontSize: 14, letterSpacing: 2 }}>
              ← POSTS
            </Text>
          </Pressable>
        </Link>

        {/* Date */}
        {formattedDate && (
          <Text
            style={{
              fontSize: 12,
              color: colors.gold,
              marginBottom: 12,
              letterSpacing: 2,
              textTransform: 'uppercase',
            }}
          >
            {formattedDate}
          </Text>
        )}

        {/* Title */}
        <Text
          style={{
            fontSize: 42,
            fontWeight: '300',
            color: colors.textPrimary,
            letterSpacing: 2,
            marginBottom: 16,
            // @ts-expect-error web style
            fontFamily: 'Georgia, serif',
            lineHeight: 52,
          }}
        >
          {frontmatter.title}
        </Text>

        {/* Description */}
        {frontmatter.description && (
          <Text
            style={{
              fontSize: 18,
              color: colors.textSecondary,
              marginBottom: 40,
              // @ts-expect-error web style
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
              lineHeight: 28,
            }}
          >
            {frontmatter.description}
          </Text>
        )}

        {/* Divider */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            marginBottom: 40,
            gap: 16,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: colors.gold, opacity: 0.3 }} />
          <View
            style={{
              width: 6,
              height: 6,
              backgroundColor: colors.gold,
              // @ts-expect-error web style
              transform: 'rotate(45deg)',
              opacity: 0.6,
            }}
          />
          <View style={{ flex: 1, height: 1, backgroundColor: colors.gold, opacity: 0.3 }} />
        </View>

        {/* Content */}
        <Component components={components} />
      </View>
    </View>
  )
}
