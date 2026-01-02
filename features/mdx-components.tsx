import { Text, View, Pressable } from 'react-native'
import type { ComponentProps, ReactNode } from 'react'
import { useState } from 'react'

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

// CollapsibleImage - for tall screenshots that can be expanded
type CollapsibleImageProps = {
  src: string
  alt?: string
  maxHeight?: number
}

function CollapsibleImage({ src, alt, maxHeight = 400 }: CollapsibleImageProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ marginBottom: 20, marginTop: 8 }}>
      <div
        style={{
          position: 'relative',
          overflow: 'hidden',
          maxHeight: expanded ? 'none' : maxHeight,
          borderRadius: 8,
          border: `1px solid ${colors.cardBorder}`,
          transition: 'max-height 0.3s ease-out',
        }}
      >
        <img
          src={src}
          alt={alt || ''}
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />
        {/* Gradient fade overlay when collapsed */}
        {!expanded && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 120,
              background: `linear-gradient(transparent, ${colors.codeBg} 70%, ${colors.codeBg})`,
              pointerEvents: 'none',
            }}
          />
        )}
        {/* Expand/collapse button */}
        <div
          onClick={() => setExpanded(!expanded)}
          style={{
            position: expanded ? 'relative' : 'absolute',
            bottom: expanded ? 0 : 12,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: expanded ? '12px 0' : 0,
            background: expanded ? colors.codeBg : 'transparent',
          }}
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 20,
              backgroundColor: colors.gold + '20',
              border: `1px solid ${colors.gold}40`,
              color: colors.gold,
              fontSize: 13,
              fontFamily: 'system-ui, sans-serif',
              fontWeight: 500,
              transition: 'all 0.2s ease',
            }}
          >
            {expanded ? 'Collapse' : 'Expand screenshot'}
            <span
              style={{
                display: 'inline-block',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            >
              ▼
            </span>
          </span>
        </div>
      </div>
      {/* Caption */}
      {alt && (
        <div
          style={{
            fontSize: 13,
            color: colors.textSecondary,
            fontStyle: 'italic',
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          {alt}
        </div>
      )}
    </div>
  )
}

// TranscriptViewer - expandable transcript viewer for AI session transcripts
type TranscriptViewerProps = {
  title: string
  tool?: 'claude-code' | 'codex' | string
  date?: string
  summary?: string
  children: ReactNode
}

function TranscriptViewer({ title, tool, date, summary, children }: TranscriptViewerProps) {
  const [expanded, setExpanded] = useState(false)

  const toolLabel = tool === 'claude-code' ? 'Claude Code' : tool === 'codex' ? 'Codex CLI' : tool

  return (
    <div
      style={{
        marginBottom: 16,
        border: `1px solid ${colors.cardBorder}`,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: colors.codeBg,
      }}
    >
      {/* Header - always visible */}
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 4 }}>
            <span
              style={{
                fontSize: 15,
                fontWeight: '600',
                color: colors.textPrimary,
                fontFamily: 'monospace',
              }}
            >
              {title}
            </span>
            {toolLabel && (
              <span
                style={{
                  backgroundColor: colors.gold + '20',
                  padding: '2px 8px',
                  borderRadius: 4,
                  fontSize: 11,
                  color: colors.gold,
                  fontFamily: 'monospace',
                }}
              >
                {toolLabel}
              </span>
            )}
          </div>
          {date && (
            <div style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 4 }}>
              {date}
            </div>
          )}
          {summary && (
            <div
              style={{
                fontSize: 13,
                color: colors.textSecondary,
                fontStyle: 'italic',
                lineHeight: '18px',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: expanded ? 'unset' : 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {summary}
            </div>
          )}
        </div>
        <span
          style={{
            fontSize: 20,
            color: colors.gold,
            marginLeft: 12,
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            display: 'inline-block',
          }}
        >
          ▼
        </span>
      </div>

      {/* Expandable content */}
      {expanded && (
        <div
          style={{
            borderTop: `1px solid ${colors.cardBorder}`,
            padding: 16,
            maxHeight: 500,
            overflowY: 'auto',
          }}
        >
          <pre
            style={{
              fontFamily: 'monospace',
              fontSize: 13,
              color: colors.textSecondary,
              lineHeight: '20px',
              whiteSpace: 'pre-wrap',
              margin: 0,
            }}
          >
            {children}
          </pre>
        </div>
      )}
    </div>
  )
}

// TranscriptGroup - groups multiple transcripts with a header
type TranscriptGroupProps = {
  title: string
  count?: number
  children: ReactNode
}

function TranscriptGroup({ title, count, children }: TranscriptGroupProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div style={{ marginBottom: 24 }}>
      <div
        onClick={() => setExpanded(!expanded)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 12,
          cursor: 'pointer',
        }}
      >
        <span
          style={{
            fontSize: 18,
            fontWeight: '600',
            color: colors.textPrimary,
            fontFamily: 'Georgia, serif',
          }}
        >
          {title}
        </span>
        {count !== undefined && (
          <span
            style={{
              fontSize: 14,
              color: colors.gold,
              marginLeft: 8,
            }}
          >
            ({count})
          </span>
        )}
        <span
          style={{
            fontSize: 14,
            color: colors.gold,
            marginLeft: 'auto',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            display: 'inline-block',
          }}
        >
          ▼
        </span>
      </div>
      {expanded && <div>{children}</div>}
    </div>
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
  // Images - constrained to content width with optional caption
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <View style={{ marginBottom: 20, marginTop: 8 }}>
      <img
        src={src}
        alt={alt || ''}
        style={{
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 8,
          border: `1px solid ${colors.cardBorder}`,
        }}
      />
      {alt && (
        <Text
          style={{
            fontSize: 13,
            color: colors.textSecondary,
            fontStyle: 'italic',
            marginTop: 8,
            textAlign: 'center',
          }}
        >
          {alt}
        </Text>
      )}
    </View>
  ),
  // Custom components for transcripts and images
  TranscriptViewer,
  TranscriptGroup,
  CollapsibleImage,
}
