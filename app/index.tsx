import { Text, View, Pressable, Image } from 'react-native'
import { Link } from 'one'

// Gothic color palette
const colors = {
  background: '#0a0a12',
  backgroundGradient: 'linear-gradient(180deg, #0a0a12 0%, #141428 50%, #0a0a12 100%)',
  gold: '#c9a227',
  textPrimary: '#e8e8f0',
  textSecondary: '#a0a0b0',
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
    <Link href={href} asChild>
      <Pressable
        style={({ pressed, hovered }) => ({
          alignItems: 'center',
          opacity: pressed ? 0.8 : 1,
          // @ts-expect-error web style
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: 'all 0.3s ease',
        })}
      >
        {({ hovered }) => (
          <View style={{ alignItems: 'center' }}>
            {/* Stained glass window image */}
            <View
              style={{
                width: 180,
                height: 240,
                // @ts-expect-error web style
                filter: hovered ? 'brightness(1.2) drop-shadow(0 0 20px rgba(201, 162, 39, 0.5))' : 'brightness(1)',
                transition: 'all 0.3s ease',
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: '100%',
                  height: '100%',
                  // @ts-expect-error web style
                  objectFit: 'contain',
                }}
              />
            </View>
            {/* Title below window */}
            <Text
              style={{
                color: hovered ? colors.gold : colors.textPrimary,
                fontSize: 14,
                fontWeight: '600',
                letterSpacing: 3,
                textTransform: 'uppercase',
                marginTop: 16,
                // @ts-expect-error web style
                fontFamily: 'Georgia, serif',
                transition: 'color 0.3s ease',
              }}
            >
              {title}
            </Text>
          </View>
        )}
      </Pressable>
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
    <View
      style={{
        flex: 1,
        minHeight: '100vh',
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
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
          bottom: 0,
          // @ts-expect-error web style
          backgroundImage: `url(${images.heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.4,
        }}
      />

      {/* Light rays overlay */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '70%',
          // @ts-expect-error web style
          backgroundImage: `url(${images.lightRays})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      {/* Gradient overlay for depth */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          // @ts-expect-error web style
          background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,18,0.8) 60%, rgba(10,10,18,0.95) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Main content */}
      <View style={{ alignItems: 'center', zIndex: 1, maxWidth: 900, width: '100%' }}>
        {/* Header / Name */}
        <View style={{ alignItems: 'center', marginBottom: 60 }}>
          <Text
            style={{
              fontSize: 56,
              fontWeight: '300',
              color: colors.textPrimary,
              letterSpacing: 8,
              textTransform: 'uppercase',
              // @ts-expect-error web style
              fontFamily: 'Georgia, serif',
              textShadowColor: 'rgba(0,0,0,0.8)',
              textShadowOffset: { width: 0, height: 4 },
              textShadowRadius: 12,
              textAlign: 'center',
            }}
          >
            Allen Eubank
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.gold,
              letterSpacing: 4,
              marginTop: 12,
              // @ts-expect-error web style
              fontFamily: 'Georgia, serif',
              fontStyle: 'italic',
            }}
          >
            (Big Boss)
          </Text>
        </View>

        {/* Stained glass windows navigation */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: 40,
            flexWrap: 'wrap',
            marginBottom: 80,
          }}
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
        </View>

        {/* Social links */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 16,
            marginBottom: 40,
          }}
        >
          <SocialLink href="https://x.com/zeroxBigBoss" label="Twitter / X">
            <TwitterIcon />
          </SocialLink>
          <SocialLink href="https://github.com/0xbigboss" label="GitHub">
            <GitHubIcon />
          </SocialLink>
        </View>

        {/* Decorative divider */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            maxWidth: 600,
            marginBottom: 30,
            gap: 16,
          }}
        >
          {/* Left line */}
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: colors.gold,
              opacity: 0.6,
            }}
          />
          {/* Center ornament - diamond with dots */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: colors.gold,
                opacity: 0.5,
              }}
            />
            <View
              style={{
                width: 8,
                height: 8,
                backgroundColor: colors.gold,
                // @ts-expect-error web style
                transform: 'rotate(45deg)',
              }}
            />
            <View
              style={{
                width: 4,
                height: 4,
                borderRadius: 2,
                backgroundColor: colors.gold,
                opacity: 0.5,
              }}
            />
          </View>
          {/* Right line */}
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: colors.gold,
              opacity: 0.6,
            }}
          />
        </View>

        {/* Tagline in footer */}
        <Text
          style={{
            fontSize: 14,
            color: colors.textSecondary,
            letterSpacing: 1,
            // @ts-expect-error web style
            fontFamily: 'Georgia, serif',
            fontStyle: 'italic',
            textAlign: 'center',
          }}
        >
          "We can build anything we want given enough time."
        </Text>
      </View>
    </View>
  )
}
