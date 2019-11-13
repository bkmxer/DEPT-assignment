function VideoLoader() {
  if (document.querySelectorAll('[js-hook-video]').length) {
    return Promise.all([
      import(/* webpackChunkName: "Video-Platforms" */ '@components/video/platforms'),
      import(/* webpackChunkName: "Video" */ '@components/video'),
    ])
  } else {
    return Promise.reject('No video element found')
  }
}

export default VideoLoader()
