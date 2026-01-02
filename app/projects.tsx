import { Text, XStack, YStack } from '~/features/ui'
import { Link } from 'one'

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
      <div
        style={{
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.cardBorder}`,
          borderRadius: 8,
          padding: 24,
          marginBottom: 20,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
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
        >
          {project.title}
        </Text>
        <Text fontSize={16} color={colors.textSecondary as any} lineHeight={24} marginBottom={16}>
          {project.description}
        </Text>
        <XStack flexWrap="wrap" gap={8}>
          {project.tags.map((tag) => (
            <YStack
              key={tag}
              backgroundColor={(colors.gold + '20') as any}
              paddingHorizontal={12}
              paddingVertical={4}
              borderRadius={4 as any}
            >
              <Text color={colors.gold as any} fontSize={12} fontWeight="500">
                {tag}
              </Text>
            </YStack>
          ))}
        </XStack>
      </div>
    </a>
  )
}

export default function Projects() {
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
          backgroundImage: 'url(/images/heroes/projects.png)',
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
          Projects
        </Text>

        {/* Subtitle */}
        <Text
          fontSize={16}
          color={colors.textSecondary as any}
          marginBottom={48}
          fontFamily={'Georgia, serif' as any}
          fontStyle="italic"
        >
          Building tools and products that matter.
        </Text>

        {/* Project cards */}
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}

        {/* More on GitHub */}
        <YStack marginTop={40} alignItems="center">
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
        </YStack>
      </YStack>
    </div>
  )
}
