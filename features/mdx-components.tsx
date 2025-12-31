import { Text, View } from 'react-native'
import type { ComponentProps, ReactNode } from 'react'

// Gothic color palette
const colors = {
  gold: '#c9a227',
  textPrimary: '#e8e8f0',
  textSecondary: '#a0a0b0',
  codeBg: '#12121f',
  cardBorder: '#2a2a4a',
}

type TextProps = ComponentProps<typeof Text>

function Heading({
  children,
  style,
  ...props
}: TextProps & { children: ReactNode }) {
  return (
    <Text {...props} style={[{ fontWeight: '600', color: colors.textPrimary }, style]}>
      {children}
    </Text>
  )
}

export const components = {
  h1: ({ children }: { children: ReactNode }) => (
    <Heading
      style={{
        fontSize: 32,
        marginBottom: 16,
        marginTop: 32,
        // @ts-expect-error web style
        fontFamily: 'Georgia, serif',
        letterSpacing: 1,
      }}
    >
      {children}
    </Heading>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <Heading
      style={{
        fontSize: 24,
        marginBottom: 12,
        marginTop: 28,
        // @ts-expect-error web style
        fontFamily: 'Georgia, serif',
      }}
    >
      {children}
    </Heading>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <Heading
      style={{
        fontSize: 20,
        marginBottom: 10,
        marginTop: 24,
        // @ts-expect-error web style
        fontFamily: 'Georgia, serif',
      }}
    >
      {children}
    </Heading>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <Text
      style={{
        fontSize: 17,
        lineHeight: 28,
        marginBottom: 16,
        color: colors.textSecondary,
        // @ts-expect-error web style
        fontFamily: 'Georgia, serif',
      }}
    >
      {children}
    </Text>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <View style={{ marginBottom: 16, paddingLeft: 20 }}>{children}</View>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <View style={{ flexDirection: 'row', marginBottom: 8 }}>
      <Text style={{ marginRight: 12, color: colors.gold }}>•</Text>
      <Text
        style={{
          flex: 1,
          fontSize: 17,
          lineHeight: 28,
          color: colors.textSecondary,
          // @ts-expect-error web style
          fontFamily: 'Georgia, serif',
        }}
      >
        {children}
      </Text>
    </View>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <Text
      style={{
        color: colors.gold,
        // @ts-expect-error web style
        textDecorationLine: 'underline',
        textDecorationColor: colors.gold + '60',
      }}
      // @ts-expect-error - web-only prop
      href={href}
      accessibilityRole="link"
    >
      {children}
    </Text>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <Text
      style={{
        fontFamily: 'monospace',
        backgroundColor: colors.codeBg,
        color: colors.gold,
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 15,
      }}
    >
      {children}
    </Text>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <View
      style={{
        backgroundColor: colors.codeBg,
        padding: 20,
        borderRadius: 8,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.cardBorder,
        overflow: 'hidden',
      }}
    >
      <Text
        style={{
          fontFamily: 'monospace',
          fontSize: 14,
          color: colors.textSecondary,
          lineHeight: 22,
        }}
      >
        {children}
      </Text>
    </View>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <blockquote
      style={{
        borderLeft: `3px solid ${colors.gold}`,
        paddingLeft: 20,
        margin: '16px 0',
        fontStyle: 'italic',
        color: colors.textPrimary,
        fontSize: 18,
        lineHeight: '28px',
        fontFamily: 'Georgia, serif',
      }}
    >
      {children}
    </blockquote>
  ),
  hr: () => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
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
  ),
}
