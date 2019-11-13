import Cookies from '@components/cookies'
import Events from '@utilities/events'

/**
 *
 * States
 * -1: 'unstarted'
 *  0: 'ended'
 *  1: 'playing'
 *  2: 'paused'
 *  3: 'buffering'
 *  5: 'video cued'
 */
class YoutubeVideo {
  constructor(options) {
    this.options = options

    this.playerOptions = {
      videoId: this.options.videoId,
      host: 'https://www.youtube.com',
      playerVars: {
        start: this.options.videoTime,
        modestbranding: 0,
        showinfo: 0,
        controls: this.options.videoControls || 0,
        rel: 0,
        origin: window.location.href,
      },
      events: {
        onReady: this.onReady.bind(this),
        onStateChange: this.onStateChange.bind(this),
      },
    }

    if (!Cookies.cookieIsValid(Cookies.cookieName.advertising)) {
      this.playerOptions.host = 'https://www.youtube-nocookie.com'
    }

    this.init()
  }

  init() {
    if (!window.YT) {
      YoutubeVideo.loadAPI()
      this.checkAPIReady()
      return
    }

    this.checkAPIReady()
  }

  static loadAPI() {
    // This code loads the IFrame Player API code asynchronously.
    const tag = document.createElement('script')
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)
  }

  initPlayer() {
    window.youtubeIsReady = true
    if (this.videoInterval) clearInterval(this.videoInterval)
    this.player = new window.YT.Player(this.options.player, this.playerOptions)
  }

  checkAPIReady() {
    window.onYouTubeIframeAPIReady = () => this.initPlayer()

    this.videoInterval = setInterval(() => {
      if (window.youtubeIsReady) {
        this.initPlayer()
        clearInterval(this.videoInterval)
      }
    }, 200)
  }

  onReady() {
    Events.$trigger('video::ready', { data: this.options })
    Events.$trigger(`video[${this.options.instanceId}]::ready`, {
      data: this.options,
    })

    Events.$trigger('video::bind-player-events', { data: this.options })
  }

  onStateChange(event) {
    switch (event.data) {
      // finished
      case 0:
        Events.$trigger('video::ended', { data: this.options })
        Events.$trigger(`video[${this.options.instanceId}]::ended`, {
          data: this.options,
        })
        break

      // playing
      case 1:
        Events.$trigger('video::playing', { data: this.options })
        Events.$trigger(`video[${this.options.instanceId}]::playing`, {
          data: this.options,
        })
        break

      // paused
      case 2:
        Events.$trigger('video::paused', { data: this.options })
        Events.$trigger(`video[${this.options.instanceId}]::paused`, {
          data: this.options,
        })
        break

      // do nothing
      default:
        break
    }
  }

  play() {
    this.player.playVideo()
  }

  pause() {
    this.player.pauseVideo()
  }

  replay() {
    this.player.stopVideo()
    this.player.playVideo()
  }

  mute() {
    this.player.mute()
  }

  unMute() {
    this.player.unMute()
  }

  setVolume(value) {
    this.player.setVolume(value)
  }
}

export default YoutubeVideo
