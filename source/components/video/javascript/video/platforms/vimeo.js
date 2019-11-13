import Cookies from '@components/cookies'
import Events from '@utilities/events'

class VimeoVideo {
  constructor(options) {
    this.options = options

    if (!Cookies.cookieIsValid(Cookies.cookieName.advertising)) {
      Events.$trigger('video::cookie-invalid', { data: this.options.element })
      return
    }

    import(/* webpackChunkName: "Vimeo-Player" */ '@vimeo/player').then(Player => {
      this.initPlayer(Player.default)
      this.bindEvents()
    })
  }

  initPlayer(Player) {
    this.player = new Player(this.options.player, {
      id: this.options.videoId,
      title: false,
      portrait: false,
    })
  }

  bindEvents() {
    Events.$trigger('video::bind-player-events', { data: this.options })

    this.player.ready().then(() => {
      if (this.options.videoTime && !this.initialPlay) {
        this.setStartTime(this.options.videoTime)
      }

      Events.$trigger('video::ready', { data: this.options })
      Events.$trigger(`video[${this.options.instanceId}]::ready`, { data: this.options })
    })

    this.player.on('play', () => {
      Events.$trigger('video::playing', { data: this.options })
      Events.$trigger(`video[${this.options.instanceId}]::playing`, { data: this.options })
    })

    this.player.on('pause', () => {
      Events.$trigger('video::paused', { data: this.options })
      Events.$trigger(`video[${this.options.instanceId}]::paused`, { data: this.options })
    })

    this.player.on('ended', () => {
      Events.$trigger('video::ended', { data: this.options })
      Events.$trigger(`video[${this.options.instanceId}]::ended`, { data: this.options })
    })
  }

  play() {
    this.player.play()
  }

  pause() {
    this.player.pause()
  }

  replay() {
    this.player.unload()
    this.player.play()
  }

  mute() {
    this.player.setVolume(0)
  }

  unMute() {
    this.player.setVolume(1)
  }

  setVolume(value) {
    this.player.setVolume(value)
  }

  setStartTime(seconds) {
    this.player
      .setCurrentTime(seconds)
      .then(() => (this.initialPlay = true))
      .catch(() => {
        this.initialPlay = false
        console.error('Unable to set start time for video', this.options.id)
      })
  }
}

export default VimeoVideo
