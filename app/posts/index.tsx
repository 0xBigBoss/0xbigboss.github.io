import { useLoader } from 'one'
import { Text, View, Pressable } from 'react-native'
import { useRouter } from 'one'

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
    <View style={{ padding: 20, maxWidth: 800, marginHorizontal: 'auto' }}>
      <Text style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 32 }}>
        Posts
      </Text>
      {posts.map((post) => {
        const formattedDate = post.date
          ? new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : null

        return (
          <Pressable
            key={post.slug}
            onPress={() => router.push(`/posts/${post.slug.replace('posts/', '')}`)}
            style={({ pressed }) => ({
              padding: 16,
              marginBottom: 16,
              backgroundColor: pressed ? '#f0f0f0' : '#fafafa',
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#eee',
            })}
          >
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 4 }}>
              {post.title}
            </Text>
            {formattedDate && (
              <Text style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>
                {formattedDate}
              </Text>
            )}
            {post.description && (
              <Text style={{ fontSize: 16, color: '#444', lineHeight: 24 }}>
                {post.description}
              </Text>
            )}
          </Pressable>
        )
      })}
    </View>
  )
}
