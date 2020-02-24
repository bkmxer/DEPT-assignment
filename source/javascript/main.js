'use strict'

/*------------------------------------*\
 * JS Main entry file
 \*------------------------------------*/
import './config'
import '@utilities/detect-touch'
import '@utilities/detect-keyboard-focus'
import '@utilities/in-view'
import '@components/image'
import '@utilities/focus-trap'
import moduleInit from '@utilities/module-init'
import VideoLoader from '@components/video/loader'
// import Subscription from '@components/subscription';

// !! Look closely at the examples to know how to use moduleInit + modular approach
// Sync example
// import moduleInit from '@utilities/module-init'
// import Example from '@components/example' // Sync
// moduleInit.sync('[js-hook-module-example]', Example) // Sync

// Async example
// import moduleInit from '@utilities/module-init'
// moduleInit.async('[js-hook-module-example]', () => import('@components/example')) // Async

moduleInit.async('[js-hook-modal]', () =>
  import(/* webpackChunkName: 'Modal' */ '@components/modal'),
)

moduleInit.async('[js-hook-toast]', () =>
  import(/* webpackChunkName: 'Toast' */ '@components/toast'),
)

moduleInit.async('[js-hook-newsletter]', () =>
  import(/* webpackChunkName: 'Subscription' */ '@components/subscription'),
)

VideoLoader.then(([Platforms, Video]) => {
  Video.default.registerPlatforms({
    native: Platforms.Native,
    youtube: Platforms.Youtube,
    vimeo: Platforms.Vimeo,
  })

  Events.$trigger('video::update')
}).catch(() => { })
