/**
 *  @shelf-version: 1.0.0
 */

import Events from '@utilities/events'

class NativeVideo {
  constructor(options) {
    this.options = options

    if (this.parseSources()) {
      this.initPlayer()
      this.bindEvents()
    }
  }

  /**
   * Init the player instance
   */
  initPlayer() {
    this.sourceData = getClosestVideoSource(this.sources)
    this.player = document.createElement('video')

    this._addMediaSources()

    if (this.options.videoClosedcaptions) {
      this._addClosedCaptions()
    }

    if (this.options.videoControls) {
      this.player.setAttribute('controls', 'controls')
    }

    if (this.options.videoLoop) {
      this.player.setAttribute('loop', 'loop')
    }

    if (this.options.videoPlaysinline) {
      // For mobile autoplay
      this.player.setAttribute('playsinline', 'playsinline')
    }

    if (this.options.videoAutoplay) {
      this.player.setAttribute('autoplay', 'autoplay')

      // For mobile autoplay
      this.player.setAttribute('playsinline', 'playsinline')
    }

    if (this.options.videoMuted) {
      this.player.setAttribute('muted', 'muted')
      this.player.muted = true
    }

    this.options.player.appendChild(this.player)
  }

  /**
   * Bind events
   */
  bindEvents() {
    Events.$trigger('video::bind-player-events', { data: this.options })

    this.player.addEventListener('loadedmetadata', () => {
      if (this.options.videoTime) this.player.currentTime = this.options.videoTime
      if (this.options.videoControls) this.player.controls = 0

      Events.$trigger('video::ready', { data: this.options })
      Events.$trigger(`video[${this.options.instanceId}]::ready`, { data: this.options })
    })

    this.player.addEventListener('playing', () => {
      if (this.options.videoControls) this.player.controls = 1

      Events.$trigger('video::playing', { data: this.options })
      Events.$trigger(`video[${this.options.instanceId}]::playing`, { data: this.options })
    })

    this.player.addEventListener('pause', () => {
      if (this.options.videoControls) this.player.controls = 0

      Events.$trigger('video::paused', { data: this.options })
      Events.$trigger(`video[${this.options.instanceId}]::paused`, { data: this.options })
    })

    this.player.addEventListener('ended', () => {
      Events.$trigger('video::ended', { data: this.options })
      Events.$trigger(`video[${this.options.instanceId}]::ended`, { data: this.options })
    })
  }

  parseSources() {
    try {
      this.sources = JSON.parse(this.options.videoSources)
      if (typeof this.sources === 'object') {
        return true
      } else {
        return false
      }
    } catch (e) {
      console.error('Failed to parse sources. Are you sure this is an object?')
      return false
    }
  }

  _addMediaSources() {
    this.sourceData.source.forEach(source => {
      this.source = document.createElement('source')
      this.source.type = source.type
      this.source.src = source.url
      this.player.appendChild(this.source)
    })
  }

  _addClosedCaptions() {
    try {
      this.closedcaptions = JSON.parse(this.options.videoClosedcaptions)

      this.closedcaptions.forEach(cc => {
        this.cc = document.createElement('track')
        this.cc.src = cc.url
        this.cc.kind = 'subtitles'
        this.cc.label = cc.label
        this.cc.srclang = cc.lang
        this.player.appendChild(this.cc)
      })
    } catch (e) {
      console.error('Failed to parse closed captions. Are you sure this is an object?')
    }
  }

  /**
   * Bind generic play event
   */
  play() {
    this.player.play()
  }

  /**
   * Bind generic pause event
   */
  pause() {
    this.player.pause()
  }

  /**
   * Bind generic replay event
   */
  replay() {
    this.player.currentTime = 0
    this.player.play()
  }

  /**
   * Bind generic mute event
   */
  mute() {
    this.player.setAttribute('muted', 'muted')
    this.player.muted = true
  }

  /**
   * Bind generic unmute event
   */
  unMute() {
    this.player.muted = false
    this.player.removeAttribute('muted')
  }

  /**
   * Bind generic setVolume event
   */
  setVolume(value) {
    this.player.volume = value
  }
}

function getClosestVideoSource(sources) {
  const windowWidth = window.innerWidth
  let closestSource = null

  try {
    sources.map(el => {
      if (
        closestSource == null ||
        Math.abs(el.size - windowWidth) < Math.abs(closestSource.size - windowWidth)
      ) {
        closestSource = el
      }
    })

    return closestSource
  } catch (e) {
    console.error('Failed to find closest source. Are you sure this is an object?')
    return closestSource
  }
}

export default NativeVideo
