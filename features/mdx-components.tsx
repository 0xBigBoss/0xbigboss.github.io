import { Text, XStack, YStack } from '~/features/ui'
import { AnimatePresence } from 'tamagui'
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'

// Gothic color palette
const colors = {
  gold: '#c9a227',
  textPrimary: '#e8e8f0',
  textSecondary: '#a0a0b0',
  codeBg: '#12121f',
  cardBorder: '#2a2a4a',
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
    <YStack marginBottom={20} marginTop={8}>
      <YStack
        position="relative"
        overflow="hidden"
        borderRadius={8 as any}
        borderWidth={1}
        borderColor={colors.cardBorder as any}
        animation="medium"
        animateOnly={['max-height']}
        maxHeight={expanded ? 2000 : maxHeight}
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
        <AnimatePresence>
          {!expanded && (
            <YStack
              key="gradient-overlay"
              animation="medium"
              animateOnly={['opacity']}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              height={120}
              pointerEvents="none"
              style={{
                background: `linear-gradient(transparent, ${colors.codeBg} 70%, ${colors.codeBg})`,
              }}
            />
          )}
        </AnimatePresence>
        {/* Expand/collapse button */}
        <XStack
          animation="medium"
          animateOnly={['opacity', 'transform']}
          position={expanded ? 'relative' : 'absolute'}
          bottom={expanded ? 0 : 12}
          left={0}
          right={0}
          justifyContent="center"
          cursor="pointer"
          paddingVertical={expanded ? 12 : 0}
          backgroundColor={expanded ? (colors.codeBg as any) : 'transparent'}
          onPress={() => setExpanded(!expanded)}
        >
          <XStack
            alignItems="center"
            gap={8}
            paddingHorizontal={16}
            paddingVertical={8}
            borderRadius={20 as any}
            backgroundColor={(colors.gold + '20') as any}
            borderWidth={1}
            borderColor={(colors.gold + '40') as any}
            animation="fast"
            hoverStyle={{
              backgroundColor: (colors.gold + '30') as any,
              scale: 1.02,
            }}
            pressStyle={{
              scale: 0.98,
            }}
          >
            <Text
              color={colors.gold as any}
              fontSize={13}
              fontFamily={'system-ui, sans-serif' as any}
              fontWeight="500"
            >
              {expanded ? 'Collapse' : 'Expand screenshot'}
            </Text>
            <YStack
              animation="fast"
              animateOnly={['transform']}
              rotate={expanded ? '180deg' : '0deg'}
            >
              <Text color={colors.gold as any} fontSize={12}>▼</Text>
            </YStack>
          </XStack>
        </XStack>
      </YStack>
      {/* Caption */}
      {alt && (
        <Text
          fontSize={13}
          color={colors.textSecondary as any}
          fontStyle="italic"
          marginTop={8}
          ta="center"
        >
          {alt}
        </Text>
      )}
    </YStack>
  )
}

// XEmbed - embedded X (Twitter) posts using syndication iframe
type XEmbedProps = {
  tweetId: string
}

function XEmbed({ tweetId }: XEmbedProps) {
  const [height, setHeight] = useState(400)

  useEffect(() => {
    // Listen for resize messages from Twitter iframe
    function handleMessage(event: MessageEvent) {
      if (event.origin === 'https://platform.twitter.com' && event.data?.['twttr.embed']) {
        const data = event.data['twttr.embed']
        if (data.method === 'twttr.private.resize' && data.params?.[0]?.height) {
          setHeight(data.params[0].height)
        }
      }
    }
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  return (
    <YStack marginBottom={20} marginTop={8} alignItems="center" width="100%">
      <iframe
        src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark`}
        style={{
          width: '100%',
          maxWidth: 550,
          height,
          border: 'none',
          borderRadius: 12,
          overflow: 'hidden',
        }}
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      />
    </YStack>
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
    <YStack
      marginBottom={16}
      borderWidth={1}
      borderColor={colors.cardBorder as any}
      borderRadius={8 as any}
      overflow="hidden"
      backgroundColor={colors.codeBg as any}
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
          <XStack alignItems="center" gap={12} marginBottom={4}>
            <Text
              fontSize={15}
              fontWeight="600"
              color={colors.textPrimary as any}
              fontFamily={'monospace' as any}
            >
              {title}
            </Text>
            {toolLabel && (
              <Text
                backgroundColor={(colors.gold + '20') as any}
                paddingHorizontal={8}
                paddingVertical={2}
                borderRadius={4 as any}
                fontSize={11}
                color={colors.gold as any}
                fontFamily={'monospace' as any}
              >
                {toolLabel}
              </Text>
            )}
          </XStack>
          {date && (
            <Text fontSize={12} color={colors.textSecondary as any} marginBottom={4}>
              {date}
            </Text>
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
    </YStack>
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
    <YStack marginBottom={24}>
      <XStack
        alignItems="center"
        marginBottom={12}
        cursor="pointer"
        onPress={() => setExpanded(!expanded)}
      >
        <Text
          fontSize={18}
          fontWeight="600"
          color={colors.textPrimary as any}
          fontFamily={'Georgia, serif' as any}
        >
          {title}
        </Text>
        {count !== undefined && (
          <Text fontSize={14} color={colors.gold as any} marginLeft={8}>
            ({count})
          </Text>
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
      </XStack>
      {expanded && <YStack>{children}</YStack>}
    </YStack>
  )
}

export const components = {
  h1: ({ children }: { children: ReactNode }) => (
    <Text
      fontSize={32}
      fontWeight="600"
      color={colors.textPrimary}
      marginBottom={16}
      marginTop={32}
      fontFamily={'Georgia, serif' as any}
      letterSpacing={1}
    >
      {children}
    </Text>
  ),
  h2: ({ children }: { children: ReactNode }) => (
    <Text
      fontSize={24}
      fontWeight="600"
      color={colors.textPrimary}
      marginBottom={12}
      marginTop={28}
      fontFamily={'Georgia, serif' as any}
    >
      {children}
    </Text>
  ),
  h3: ({ children }: { children: ReactNode }) => (
    <Text
      fontSize={20}
      fontWeight="600"
      color={colors.textPrimary}
      marginBottom={10}
      marginTop={24}
      fontFamily={'Georgia, serif' as any}
    >
      {children}
    </Text>
  ),
  p: ({ children }: { children: ReactNode }) => (
    <Text
      fontSize={17}
      lineHeight={28}
      marginBottom={16}
      color={colors.textSecondary as any}
      fontFamily={'Georgia, serif' as any}
    >
      {children}
    </Text>
  ),
  ul: ({ children }: { children: ReactNode }) => (
    <YStack marginBottom={16} paddingLeft={20}>
      {children}
    </YStack>
  ),
  li: ({ children }: { children: ReactNode }) => (
    <XStack marginBottom={8}>
      <Text marginRight={12} color={colors.gold as any}>
        •
      </Text>
      <Text
        flex={1}
        fontSize={17}
        lineHeight={28}
        color={colors.textSecondary as any}
        fontFamily={'Georgia, serif' as any}
      >
        {children}
      </Text>
    </XStack>
  ),
  a: ({ href, children }: { href?: string; children: ReactNode }) => (
    <a
      href={href}
      style={{
        color: colors.gold,
        textDecoration: 'underline',
        textDecorationColor: colors.gold + '60',
      }}
    >
      {children}
    </a>
  ),
  code: ({ children }: { children: ReactNode }) => (
    <Text
      fontFamily={'monospace' as any}
      backgroundColor={colors.codeBg as any}
      color={colors.gold as any}
      paddingHorizontal={6}
      paddingVertical={2}
      borderRadius={4 as any}
      fontSize={15}
    >
      {children}
    </Text>
  ),
  pre: ({ children }: { children: ReactNode }) => (
    <YStack
      backgroundColor={colors.codeBg as any}
      padding={20}
      borderRadius={8 as any}
      marginBottom={20}
      borderWidth={1}
      borderColor={colors.cardBorder as any}
      overflow="hidden"
    >
      <Text fontFamily={'monospace' as any} fontSize={14} color={colors.textSecondary as any} lineHeight={22}>
        {children}
      </Text>
    </YStack>
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
    <XStack alignItems="center" marginVertical={32} gap={16}>
      <YStack flex={1} height={1} backgroundColor={colors.gold as any} opacity={0.3} />
      <YStack
        width={6}
        height={6}
        backgroundColor={colors.gold as any}
        rotate="45deg"
        opacity={0.6}
      />
      <YStack flex={1} height={1} backgroundColor={colors.gold as any} opacity={0.3} />
    </XStack>
  ),
  // Images - constrained to content width with optional caption
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <YStack marginBottom={20} marginTop={8}>
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
          fontSize={13}
          color={colors.textSecondary as any}
          fontStyle="italic"
          marginTop={8}
          ta="center"
        >
          {alt}
        </Text>
      )}
    </YStack>
  ),
  // Custom components for transcripts and images
  TranscriptViewer,
  TranscriptGroup,
  CollapsibleImage,
  XEmbed,
}
