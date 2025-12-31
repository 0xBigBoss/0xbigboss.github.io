import { Text, View, Pressable } from 'react-native'
import { Link } from 'one'

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

type Project = {
  title: string
  description: string
  href: string
  tags: string[]
}

const projects: Project[] = [
  {
    title: 'Send',
    description: 'Peer-to-peer money, built for global use.',
    href: 'https://send.app',
    tags: ['Web3', 'Canton Network', 'TypeScript'],
  },
  {
    title: 'Claude Code',
    description: 'Comprehensive configuration system for Claude Code. Skills, hooks, and best practices for getting the most out of AI-assisted development.',
    href: 'https://github.com/0xbigboss/claude-code',
    tags: ['AI', 'Developer Tools', 'Claude'],
  },
  {
    title: 'Supabase Branch Action',
    description: 'A GitHub Action to return the Supabase preview branch URL and credentials for a given Supabase project. Streamlines CI/CD workflows.',
    href: 'https://github.com/0xbigboss/supabase-branch-gh-action',
    tags: ['GitHub Actions', 'Supabase', 'DevOps'],
  },
]

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: 'none' }}
    >
      <View
        style={{
          backgroundColor: colors.cardBg,
          borderWidth: 1,
          borderColor: colors.cardBorder,
          borderRadius: 8,
          padding: 24,
          marginBottom: 20,
          // @ts-expect-error web style
          transition: 'all 0.3s ease',
          cursor: 'pointer',
        }}
        // @ts-expect-error web props
        onMouseEnter={(e: any) => {
          e.currentTarget.style.borderColor = colors.gold
          e.currentTarget.style.boxShadow = `0 0 20px ${colors.gold}20`
        }}
        onMouseLeave={(e: any) => {
          e.currentTarget.style.borderColor = colors.cardBorder
          e.currentTarget.style.boxShadow = 'none'
        }}
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
          {project.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colors.textSecondary,
            lineHeight: 24,
            marginBottom: 16,
          }}
        >
          {project.description}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {project.tags.map((tag) => (
            <View
              key={tag}
              style={{
                backgroundColor: `${colors.gold}20`,
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 4,
              }}
            >
              <Text style={{ color: colors.gold, fontSize: 12, fontWeight: '500' }}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </a>
  )
}

export default function Projects() {
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
          backgroundImage: 'url(/images/heroes/projects.png)',
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
          Projects
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
          Building tools and products that matter.
        </Text>

        {/* Project cards */}
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}

        {/* More on GitHub */}
        <View style={{ alignItems: 'center', marginTop: 40 }}>
          <a
            href="https://github.com/0xbigboss"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: colors.textSecondary,
              textDecoration: 'none',
              fontSize: 14,
              letterSpacing: 1,
            }}
          >
            View more on GitHub →
          </a>
        </View>
      </View>
    </View>
  )
}
