import { useLoader } from 'one'
import { Text, YStack } from '~/features/ui'
import { Link, useRouter } from 'one'

// Gothic color palette (shared with index)
const colors = {
  background: '#0a0a12' as const,
  backgroundGradient: 'linear-gradient(180deg, #0a0a12 0%, #141428 50%, #0a0a12 100%)' as const,
  gold: '#c9a227' as const,
  textPrimary: '#e8e8f0' as const,
  textSecondary: '#a0a0b0' as const,
  cardBg: '#12121f' as const,
  cardBorder: '#2a2a4a' as const,
}

type Post = {
  title: string
  description?: string
  date?: string
  slug: string
}

export async function loader(): Promise<{ posts: Post[] }> {
  const { getAllFrontmatter } = await import('@vxrn/mdx')
  const posts = getAllFrontmatter('data/posts') as Post[]
  return {
    posts: posts.sort((a, b) => {
      if (!a.date || !b.date) return 0
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }),
  }
}

export default function PostsIndex() {
  const { posts } = useLoader(loader)
  const router = useRouter()

  return (
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
          opacity: 0.3,
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
      <YStack maxWidth={800} marginHorizontal="auto" width="100%" zIndex={1}>
        {/* Back link */}
        <Link href={'/' as any}>
          <Text color={colors.gold as any} fontSize={14} letterSpacing={2} marginBottom={40}>
            ← BACK
          </Text>
        </Link>

        {/* Page title */}
        <Text
          fontSize={48}
          fontWeight="300"
          color={colors.textPrimary as any}
          letterSpacing={6}
          textTransform="uppercase"
          marginBottom={16}
          fontFamily={'Georgia, serif' as any}
        >
          Posts
        </Text>

        {/* Subtitle */}
        <Text
          fontSize={16}
          color={colors.textSecondary as any}
          marginBottom={48}
          fontFamily={'Georgia, serif' as any}
          fontStyle="italic"
        >
          Thoughts, learnings, and chronicles of the journey.
        </Text>

        {/* Posts list */}
        {posts.map((post) => {
          const formattedDate = post.date
            ? new Date(post.date + 'T12:00:00').toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })
            : null

          return (
            <div
              key={post.slug}
              onClick={() => router.push(`/posts/${post.slug.replace('posts/', '')}` as any)}
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                borderRadius: 8,
                padding: 24,
                marginBottom: 16,
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.gold
                e.currentTarget.style.boxShadow = `0 0 20px ${colors.gold}20`
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = colors.cardBorder
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <Text
                fontSize={24}
                fontWeight="600"
                color={colors.textPrimary as any}
                marginBottom={8}
                fontFamily={'Georgia, serif' as any}
                style={{ display: 'block' }}
              >
                {post.title}
              </Text>
              {formattedDate && (
                <Text
                  fontSize={12}
                  color={colors.gold as any}
                  marginBottom={12}
                  letterSpacing={1}
                  textTransform="uppercase"
                  style={{ display: 'block' }}
                >
                  {formattedDate}
                </Text>
              )}
              {post.description && (
                <Text
                  fontSize={16}
                  color={colors.textSecondary as any}
                  lineHeight={24}
                  style={{ display: 'block' }}
                >
                  {post.description}
                </Text>
              )}
            </div>
          )
        })}

        {posts.length === 0 && (
          <YStack
            backgroundColor={colors.cardBg as any}
            borderWidth={1}
            borderColor={colors.cardBorder as any}
            borderRadius={8 as any}
            padding={40}
            alignItems="center"
          >
            <Text
              fontSize={16}
              color={colors.textSecondary as any}
              fontFamily={'Georgia, serif' as any}
              fontStyle="italic"
            >
              More posts coming soon...
            </Text>
          </YStack>
        )}
      </YStack>
    </div>
  )
}
