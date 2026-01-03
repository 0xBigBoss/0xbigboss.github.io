import { Text, XStack, YStack } from '~/features/ui'
import { Link, Head } from 'one'

// Gothic color palette
const colors = {
  background: '#0a0a12' as const,
  backgroundGradient: 'linear-gradient(180deg, #0a0a12 0%, #141428 50%, #0a0a12 100%)' as const,
  gold: '#c9a227' as const,
  textPrimary: '#e8e8f0' as const,
  textSecondary: '#a0a0b0' as const,
}

// Image paths
const images = {
  heroBackground: '/images/heroes/home.png',
  lightRays: '/images/decorative/light-rays.png',
  divider: '/images/decorative/divider.png',
  windows: {
    projects: '/images/windows/projects.png',
    posts: '/images/windows/posts.png',
    contact: '/images/windows/contact.png',
  },
}

// Stained glass window component with actual images
function StainedGlassWindow({
  title,
  href,
  image,
}: {
  title: string
  href: string
  image: string
}) {
  return (
    <Link href={href as any}>
      <YStack
        alignItems="center"
        cursor="pointer"
        hoverStyle={{
          scale: 1.05,
        }}
      >
        {/* Stained glass window image */}
        <YStack style={{ width: 280 }}>
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: 'auto',
              transition: 'filter 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = 'drop-shadow(0 0 20px rgba(201, 162, 39, 0.5))'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = 'none'
            }}
          />
        </YStack>
        {/* Title below window */}
        <Text
          color={colors.textPrimary as any}
          fontSize={14}
          fontWeight="600"
          letterSpacing={3}
          textTransform="uppercase"
          marginTop={24}
          fontFamily={'Georgia, serif' as any}
          hoverStyle={{
            color: colors.gold as any,
          }}
        >
          {title}
        </Text>
      </YStack>
    </Link>
  )
}

// Social icon link component
function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        color: colors.textSecondary,
        textDecoration: 'none',
        padding: 12,
        transition: 'color 0.2s ease',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = colors.gold)}
      onMouseLeave={(e) => (e.currentTarget.style.color = colors.textSecondary)}
    >
      {children}
    </a>
  )
}

// Twitter/X icon
function TwitterIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

// GitHub icon
function GitHubIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )
}

export default function Index() {
  return (
    <>
      <Head>
        <title>Allen Eubank | Big Boss</title>
        <meta name="title" content="Allen Eubank | Big Boss" />
        <meta name="description" content="Builder and engineer. We can build anything we want given enough time." />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://0xbigboss.github.io/" />
        <meta property="og:title" content="Allen Eubank | Big Boss" />
        <meta property="og:description" content="Builder and engineer. We can build anything we want given enough time." />
        <meta property="og:image" content="https://0xbigboss.github.io/images/heroes/home.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@zeroxBigBoss" />
        <meta name="twitter:creator" content="@zeroxBigBoss" />
        <meta name="twitter:title" content="Allen Eubank | Big Boss" />
        <meta name="twitter:description" content="Builder and engineer. We can build anything we want given enough time." />
        <meta name="twitter:image" content="https://0xbigboss.github.io/images/heroes/home.png" />
      </Head>
      <div
      style={{
        flex: 1,
        minHeight: '100vh',
        backgroundColor: colors.background,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
          bottom: 0,
          backgroundImage: `url(${images.heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.4,
        }}
      />

      {/* Light rays overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '70%',
          backgroundImage: `url(${images.lightRays})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Gradient overlay for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,18,0.8) 60%, rgba(10,10,18,0.95) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <YStack alignItems="center" zIndex={1} maxWidth={1100} width="100%">
        {/* Header / Name */}
        <YStack alignItems="center" marginBottom={60}>
          <Text
            fontSize={56}
            fontWeight="300"
            color={colors.textPrimary as any}
            letterSpacing={8}
            textTransform="uppercase"
            fontFamily={'Georgia, serif' as any}
            textShadowColor={'rgba(0,0,0,0.8)' as any}
            textShadowOffset={{ width: 0, height: 4 }}
            textShadowRadius={12}
            ta="center"
          >
            Allen Eubank
          </Text>
          <Text
            fontSize={16}
            color={colors.gold as any}
            letterSpacing={4}
            marginTop={12}
            fontFamily={'Georgia, serif' as any}
            fontStyle="italic"
          >
            (Big Boss)
          </Text>
        </YStack>

        {/* Stained glass windows navigation */}
        <XStack
          justifyContent="center"
          alignItems="flex-start"
          gap={60}
          flexWrap="wrap"
          marginBottom={80}
        >
          <StainedGlassWindow
            title="Projects"
            href="/projects"
            image={images.windows.projects}
          />
          <StainedGlassWindow
            title="Posts"
            href="/posts"
            image={images.windows.posts}
          />
          <StainedGlassWindow
            title="Contact"
            href="/contact"
            image={images.windows.contact}
          />
        </XStack>

        {/* Social links */}
        <XStack justifyContent="center" gap={16} marginBottom={40}>
          <SocialLink href="https://x.com/zeroxBigBoss" label="Twitter / X">
            <TwitterIcon />
          </SocialLink>
          <SocialLink href="https://github.com/0xbigboss" label="GitHub">
            <GitHubIcon />
          </SocialLink>
        </XStack>

        {/* Decorative divider */}
        <XStack
          alignItems="center"
          width="100%"
          maxWidth={600}
          marginBottom={30}
          gap={16}
        >
          {/* Left line */}
          <YStack flex={1} height={1} backgroundColor={colors.gold as any} opacity={0.6} />
          {/* Center ornament - diamond with dots */}
          <XStack alignItems="center" gap={8}>
            <YStack
              width={4}
              height={4}
              borderRadius={2 as any}
              backgroundColor={colors.gold as any}
              opacity={0.5}
            />
            <YStack
              width={8}
              height={8}
              backgroundColor={colors.gold as any}
              rotate="45deg"
            />
            <YStack
              width={4}
              height={4}
              borderRadius={2 as any}
              backgroundColor={colors.gold as any}
              opacity={0.5}
            />
          </XStack>
          {/* Right line */}
          <YStack flex={1} height={1} backgroundColor={colors.gold as any} opacity={0.6} />
        </XStack>

        {/* Tagline in footer */}
        <Text
          fontSize={14}
          color={colors.textSecondary as any}
          letterSpacing={1}
          fontFamily={'Georgia, serif' as any}
          fontStyle="italic"
          ta="center"
        >
          "We can build anything we want given enough time."
        </Text>
      </YStack>
    </div>
    </>
  )
}
