'use strict'

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config'
import '@utilities/detect-touch'
import '@utilities/detect-keyboard-focus'
import '@utilities/in-view'
import '@components/image'

// import Example from '@components/example' // Sync
// moduleInit.sync('[js-hook-module-example]', Example) // Sync
// moduleInit.async('[js-hook-module-example]', () => import('@components/example')) // Async
import VideoLoader from '@components/video/loader'
// import moduleInit from '@utilities/module-init'
// import Events from '@utilities/events'
VideoLoader.then(([Platforms, Video]) => {
  Video.default.registerPlatforms({
    native: Platforms.Native,
    youtube: Platforms.Youtube,
    vimeo: Platforms.Vimeo,
  })
}).catch(() => {})
