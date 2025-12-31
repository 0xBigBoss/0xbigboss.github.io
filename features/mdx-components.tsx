import { Text, View } from 'react-native'
import type { ComponentProps, ReactNode } from 'react'

type TextProps = ComponentProps<typeof Text>

function Heading({
  children,
  style,
  ...props
}: TextProps & { children: ReactNode }) {
  return (
    <Text {...props} style={[{ fontWeight: 'bold' }, style]}>
      {children}
    </Text>
  )
}

export const components = {
  h1: ({ children }: { children: ReactNode }) => (
    <Heading style={{ fontSize: 32, marginBottom: 16, marginTop: 24 }}>
      {children}
    </Heading>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <Heading style={{ fontSize: 24, marginBottom: 12, marginTop: 20 }}>
      {children}
    </Heading>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <Heading style={{ fontSize: 20, marginBottom: 10, marginTop: 16 }}>
      {children}
    </Heading>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <Text style={{ fontSize: 16, lineHeight: 24, marginBottom: 12 }}>
      {children}
    </Text>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <View style={{ marginBottom: 12, paddingLeft: 20 }}>{children}</View>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <View style={{ flexDirection: 'row', marginBottom: 4 }}>
      <Text style={{ marginRight: 8 }}>•</Text>
      <Text style={{ flex: 1, fontSize: 16, lineHeight: 24 }}>{children}</Text>
    </View>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <Text
      style={{ color: '#0066cc', textDecorationLine: 'underline' }}
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
        backgroundColor: '#f4f4f4',
        paddingHorizontal: 4,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 14,
      }}
    >
      {children}
    </Text>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <View
      style={{
        backgroundColor: '#1e1e1e',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
      }}
    >
      <Text
        style={{
          fontFamily: 'monospace',
          fontSize: 14,
          color: '#d4d4d4',
          lineHeight: 20,
        }}
      >
        {children}
      </Text>
    </View>
  ),
  blockquote: ({ children }: { children: ReactNode }) => (
    <View
      style={{
        borderLeftWidth: 4,
        borderLeftColor: '#ddd',
        paddingLeft: 16,
        marginBottom: 12,
      }}
    >
      <Text style={{ fontStyle: 'italic', color: '#666' }}>{children}</Text>
    </View>
  ),
  hr: () => (
    <View
      style={{
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 24,
      }}
    />
  ),
}
