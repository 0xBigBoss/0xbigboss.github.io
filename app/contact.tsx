import { Text, XStack, YStack } from '~/features/ui'
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

type ContactLink = {
  label: string
  value: string
  href: string
  icon: React.ReactNode
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

// Email icon
function EmailIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    </svg>
  )
}

const contactLinks: ContactLink[] = [
  {
    label: 'Twitter / X',
    value: '@zeroxBigBoss',
    href: 'https://x.com/zeroxBigBoss',
    icon: <TwitterIcon />,
  },
  {
    label: 'GitHub',
    value: '0xbigboss',
    href: 'https://github.com/0xbigboss',
    icon: <GitHubIcon />,
  },
  {
    label: 'Email',
    value: 'bigboss@metalrodeo.xyz',
    href: 'mailto:bigboss@metalrodeo.xyz',
    icon: <EmailIcon />,
  },
]

function ContactCard({ link }: { link: ContactLink }) {
  return (
    <a
      href={link.href}
      target={link.href.startsWith('mailto:') ? undefined : '_blank'}
      rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      style={{ textDecoration: 'none' }}
    >
      <XStack
        backgroundColor={colors.cardBg as any}
        borderWidth={1}
        borderColor={colors.cardBorder as any}
        borderRadius={8 as any}
        padding={24}
        marginBottom={16}
        alignItems="center"
        gap={20}
        cursor="pointer"
        hoverStyle={{
          borderColor: colors.gold as any,
        }}
      >
        <YStack style={{ color: colors.gold }}>
          {link.icon}
        </YStack>
        <YStack flex={1}>
          <Text
            fontSize={12}
            color={colors.textSecondary as any}
            textTransform="uppercase"
            letterSpacing={2}
            marginBottom={4}
          >
            {link.label}
          </Text>
          <Text
            fontSize={18}
            color={colors.textPrimary as any}
            fontFamily={'Georgia, serif' as any}
          >
            {link.value}
          </Text>
        </YStack>
        <Text color={colors.gold as any} fontSize={20}>→</Text>
      </XStack>
    </a>
  )
}

export default function Contact() {
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
          backgroundImage: 'url(/images/heroes/contact.png)',
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
          background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,18,0.9) 300px, rgba(10,10,18,1) 400px)',
          pointerEvents: 'none',
        }}
      />
      <YStack maxWidth={600} marginHorizontal="auto" width="100%" zIndex={1}>
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
          Contact
        </Text>

        {/* Subtitle */}
        <Text
          fontSize={16}
          color={colors.textSecondary as any}
          marginBottom={48}
          fontFamily={'Georgia, serif' as any}
          fontStyle="italic"
        >
          Let's build something together.
        </Text>

        {/* Contact cards */}
        {contactLinks.map((link) => (
          <ContactCard key={link.label} link={link} />
        ))}

        {/* Additional note */}
        <YStack marginTop={48} alignItems="center">
          <Text
            fontSize={14}
            color={colors.textSecondary as any}
            ta="center"
            lineHeight={22}
            fontFamily={'Georgia, serif' as any}
          >
            For project inquiries, collaborations, or just to say hello —{'\n'}
            DMs are open.
          </Text>
        </YStack>
      </YStack>
    </div>
  )
}
