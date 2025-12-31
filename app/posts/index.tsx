import { useLoader } from 'one'
import { Text, View, Pressable } from 'react-native'
import { Link, useRouter } from 'one'

// Gothic color palette (shared with index)
const colors = {
  background: '#0a0a12',
  backgroundGradient: 'linear-gradient(180deg, #0a0a12 0%, #141428 50%, #0a0a12 100%)',
  gold: '#c9a227',
  textPrimary: '#e8e8f0',
  textSecondary: '#a0a0b0',
  cardBg: '#12121f',
  cardBorder: '#2a2a4a',
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
          opacity: 0.3,
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
      <View style={{ maxWidth: 800, marginHorizontal: 'auto', width: '100%', zIndex: 1 }}>
        {/* Back link */}
        <Link href="/" asChild>
          <Pressable style={{ marginBottom: 40 }}>
            <Text style={{ color: colors.gold, fontSize: 14, letterSpacing: 2 }}>
              ← BACK
            </Text>
          </Pressable>
        </Link>

        {/* Page title */}
        <Text
          style={{
            fontSize: 48,
            fontWeight: '300',
            color: colors.textPrimary,
            letterSpacing: 6,
            textTransform: 'uppercase',
            marginBottom: 16,
            // @ts-expect-error web style
            fontFamily: 'Georgia, serif',
          }}
        >
          Posts
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontSize: 16,
            color: colors.textSecondary,
            marginBottom: 48,
            // @ts-expect-error web style
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
          }}
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
            <Pressable
              key={post.slug}
              onPress={() => router.push(`/posts/${post.slug.replace('posts/', '')}`)}
              style={({ pressed, hovered }) => ({
                backgroundColor: colors.cardBg,
                borderWidth: 1,
                borderColor: hovered ? colors.gold : colors.cardBorder,
                borderRadius: 8,
                padding: 24,
                marginBottom: 16,
                opacity: pressed ? 0.9 : 1,
                // @ts-expect-error web style
                boxShadow: hovered ? `0 0 20px ${colors.gold}20` : 'none',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
              })}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '600',
                  color: colors.textPrimary,
                  marginBottom: 8,
                  // @ts-expect-error web style
                  fontFamily: 'Georgia, serif',
                }}
              >
                {post.title}
              </Text>
              {formattedDate && (
                <Text
                  style={{
                    fontSize: 12,
                    color: colors.gold,
                    marginBottom: 12,
                    letterSpacing: 1,
                    textTransform: 'uppercase',
                  }}
                >
                  {formattedDate}
                </Text>
              )}
              {post.description && (
                <Text
                  style={{
                    fontSize: 16,
                    color: colors.textSecondary,
                    lineHeight: 24,
                  }}
                >
                  {post.description}
                </Text>
              )}
            </Pressable>
          )
        })}

        {posts.length === 0 && (
          <View
            style={{
              backgroundColor: colors.cardBg,
              borderWidth: 1,
              borderColor: colors.cardBorder,
              borderRadius: 8,
              padding: 40,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: colors.textSecondary,
                // @ts-expect-error web style
                fontFamily: 'Georgia, serif',
                fontStyle: 'italic',
              }}
            >
              More posts coming soon...
            </Text>
          </View>
        )}
      </View>
    </View>
  )
}
