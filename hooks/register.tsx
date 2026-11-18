import type { Register, ThemeSetArgs } from 'claude-code'

import { LOCKUP_REVERSE } from './logo'
import { makeColors } from './make-colors.js'

// ICP Modern Sports Search palette (ICP design system, tokens.json).
const PITCH = '#132d25'
const ICP_GREEN = '#17a95e'
const FLOODLIGHT = '#80ef80'
const MATCHDAY_AMBER = '#ffb43c' // the rare spark: only ever a small mark on pitch
const SLATE = '#444d4a'
const GREY_400 = '#bababa'
const WHITE = '#ffffff'

const TAGLINE = 'Trusted Search for Modern Sport'

// Light: white and mint grounds with pitch text. Dark: the pitch ground with
// white text. Accent is ICP Green, success is Floodlight. Amber is kept out of
// the roles (they paint fills and tinted backgrounds) and appears only as the
// live marker in the band below, on pitch.
const { theme, problems } = makeColors({
  label: 'ICP Modern Sports Search',
  roles: { accent: ICP_GREEN, success: FLOODLIGHT, danger: '#e0574c', pro: '#2f7ea8' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#eef8ef', // a whisper of mint
        'surface-1': '#f7fcf7',
        'surface-2': WHITE,
        'text-primary': PITCH,
        'text-secondary': SLATE,
        'text-muted': '#5a6561',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': PITCH,
        'surface-1': '#173229',
        'surface-2': '#1a372d',
        'surface-3': '#1d3b31',
        'text-primary': WHITE,
        'text-secondary': '#d6dfdb',
        'text-muted': GREY_400,
      },
    },
  },
})

const LOOK: ThemeSetArgs = { colors: theme }

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    await $.theme.set(LOOK)
    $.ui.status(TAGLINE)

    return next(e)
  })

  // A slim pitch strip above the prompt: the official reverse lockup, and a
  // small Matchday Amber dot that shows only while Claude is working.
  on('ui.render', { component: 'AbovePrompt' }, ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }
    const live = e.props.isWorking

    if (e.surface !== 'desktop' && e.surface !== 'mobile') {
      const { Box, Text } = $.ui.resolve(e)

      return (
        <Box gap={1}>
          <Text color={ICP_GREEN} bold>ICP</Text>
          <Text dimColor>MODERN SPORTS SEARCH</Text>
          {live ? <Text color={MATCHDAY_AMBER}>●</Text> : null}
        </Box>
      )
    }
    const { Box, Text, Svg } = $.ui.resolve(e)

    return (
      <Box
        backgroundColor={PITCH}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        paddingX={2}
        paddingY={1}
      >
        <Svg source={LOCKUP_REVERSE} alt="ICP Modern Sports Search" width={150} height={45} />
        {live ? (
          <Box flexDirection="row" alignItems="center" gap={1}>
            <Text color={MATCHDAY_AMBER}>●</Text>
            <Text color={GREY_400} size="caption">Live</Text>
          </Box>
        ) : null}
      </Box>
    )
  })
}
