'use strict'

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config'
import '@utilities/detect-touch'
import '@utilities/detect-keyboard-focus'
import '@utilities/in-view'

import '@components/image'
import VideoLoader from '@components/video/loader'

// Sync example
// import Example from '@components/example' // Sync
// moduleInit.sync('[js-hook-module-example]', Example) // Sync

// Async example
// moduleInit.async('[js-hook-module-example]', () => import('@components/example')) // Async

VideoLoader.then(([Platforms, Video]) => {
  Video.default.registerPlatforms({
    native: Platforms.Native,
    youtube: Platforms.Youtube,
    vimeo: Platforms.Vimeo,
  })
}).catch(() => {})
