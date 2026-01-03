import { getMDXComponent } from 'mdx-bundler/client'
import { useMemo } from 'react'
import { useLoader, Link, Head } from 'one'
import { Text, XStack, YStack } from '~/features/ui'
import { components } from '~/features/mdx-components'

const siteUrl = 'https://0xbigboss.github.io'

// Gothic color palette
const colors = {
  background: '#0a0a12' as const,
  gold: '#c9a227' as const,
  textPrimary: '#e8e8f0' as const,
  textSecondary: '#a0a0b0' as const,
}

type Frontmatter = {
  title: string
  description?: string
  date?: string
  image?: string
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
    frontmatter: { ...frontmatter, slug: params.slug } as Frontmatter,
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

  const postUrl = `${siteUrl}/posts/${frontmatter.slug}`
  const imageUrl = frontmatter.image
    ? `${siteUrl}${frontmatter.image}`
    : `${siteUrl}/images/heroes/posts.png`

  return (
    <>
      <Head>
        <title>{`${frontmatter.title} | Allen Eubank`}</title>
        <meta name="title" content={frontmatter.title} />
        <meta name="description" content={frontmatter.description || ''} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={postUrl} />
        <meta property="og:title" content={frontmatter.title} />
        <meta property="og:description" content={frontmatter.description || ''} />
        <meta property="og:image" content={imageUrl} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zeroxBigBoss" />
        <meta name="twitter:creator" content="@zeroxBigBoss" />
        <meta name="twitter:title" content={frontmatter.title} />
        <meta name="twitter:description" content={frontmatter.description || ''} />
        <meta name="twitter:image" content={imageUrl} />
      </Head>
      <div
      style={{
        flex: 1,
        minHeight: '100vh',
        backgroundColor: colors.background,
        paddingTop: 60,
        paddingBottom: 60,
        paddingLeft: 20,
        paddingRight: 20,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Hero background image */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 400,
          backgroundImage: 'url(/images/heroes/posts.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.25,
        }}
      />
      {/* Gradient overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'linear-gradient(180deg, transparent 0%, rgba(10,10,18,0.9) 300px, rgba(10,10,18,1) 400px)',
          pointerEvents: 'none',
        }}
      />
      <YStack maxWidth={700} marginHorizontal="auto" width="100%" zIndex={1}>
        {/* Back link */}
        <YStack marginBottom={60}>
          <Link href={'/posts' as any}>
            <Text color={colors.gold as any} fontSize={14} letterSpacing={2}>
              ← POSTS
            </Text>
          </Link>
        </YStack>

        {/* Date */}
        {formattedDate && (
          <Text
            fontSize={12}
            color={colors.gold as any}
            marginBottom={12}
            letterSpacing={2}
            textTransform="uppercase"
          >
            {formattedDate}
          </Text>
        )}

        {/* Title */}
        <Text
          fontSize={42}
          fontWeight="300"
          color={colors.textPrimary as any}
          letterSpacing={2}
          marginBottom={16}
          fontFamily={'Georgia, serif' as any}
          lineHeight={52}
        >
          {frontmatter.title}
        </Text>

        {/* Description */}
        {frontmatter.description && (
          <Text
            fontSize={18}
            color={colors.textSecondary as any}
            marginBottom={40}
            fontFamily={'Georgia, serif' as any}
            fontStyle="italic"
            lineHeight={28}
          >
            {frontmatter.description}
          </Text>
        )}

        {/* Divider */}
        <XStack alignItems="center" width="100%" marginBottom={40} gap={16}>
          <YStack flex={1} height={1} backgroundColor={colors.gold as any} opacity={0.3} />
          <YStack
            width={6}
            height={6}
            backgroundColor={colors.gold as any}
            rotate="45deg"
            opacity={0.6}
          />
          <YStack flex={1} height={1} backgroundColor={colors.gold as any} opacity={0.3} />
        </XStack>

        {/* Content */}
        <Component components={components} />
      </YStack>
    </div>
  </>
  )
}
