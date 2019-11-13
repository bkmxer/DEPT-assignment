# Video component

## Table of contents

1. [What does it do](#markdown-header-what-does-it-do)
2. [Install](#markdown-header-install)
3. [How to use](#markdown-header-how-to-use)
4. [Dependencies](#markdown-header-dependencies)
5. [Changelog](#markdown-header-changelog)
6. [Developers](#markdown-header-developers)

![Video Demo](https://media.giphy.com/media/7AaqrqQUPys39wn1CN/giphy.gif)

## What does it do

- Plays Youtube, Vimeo and native video
- Fires generic video ready, play & pause events.

## Install

Import module

```javascript
import '@utilities/in-view'
import '@components/image'
import VideoLoader from '@components/video/loader'
```

## How to use

### Default

```javascript
import '@utilities/in-view'
import '@components/image'
import VideoLoader from '@components/video/loader'

VideoLoader.then(([Platforms, Video]) => {
  Video.default.registerPlatforms({
    native: Platforms.Native,
    youtube: Platforms.Youtube,
    vimeo: Platforms.Vimeo,
  })
}).catch(() => {})
```

Create player in HTML. The player will use the [in-view library](/utilities/in-view/) to initialise the videos when they're in view.

```htmlmixed
{% from 'video.html' import video  %}

{{ video({
    instance_id: 1,
    id: 'GrDHJK9UYpU',
    platform: 'youtube',
    title: 'title here',
    description: 'description here',
    thumbnail: '/assets/images/thumbs/thumb.jpg',
    total_time: 'T1M33S',
    start_time: '10',
    classes: 'additional-class',
    controls: 1,
    info: 1,
    image: {
        preload: 'https://i.vimeocdn.com/video/301621689_10.jpg',
        image: 'https://i.vimeocdn.com/video/301621689_1024.jpg',
        srcset: 'https://i.vimeocdn.com/video/301621689_320.jpg 320w, https://i.vimeocdn.com/video/301621689_480.jpg 480w, https://i.vimeocdn.com/video/301621689_768.jpg 768w, https://i.vimeocdn.com/video/301621689_1024.jpg 1024w, https://i.vimeocdn.com/video/301621689_1280.jpg 1280w, https://i.vimeocdn.com/video/301621689_1440.jpg 1440w'
    }
}) }}
```

### Without in-view

This will initialise all the players on the page. If autoplay parameter is set, it will also autoplay all videos.

```javascript
import '@components/image'
import VideoLoader from '@components/video/loader'

VideoLoader.then(([Platforms, Video]) => {
  Video.default.registerPlatforms({
    native: Platforms.Native,
    youtube: Platforms.Youtube,
    vimeo: Platforms.Vimeo,
  })

  Events.$trigger('video::update')
}).catch(() => {})
```

Create the player the same as in the previous demo. But now add a `inview: false` as parameter.

```htmlmixed
{% from 'video.html' import video  %}

{{ video({
    instance_id: 1,
    id: 'GrDHJK9UYpU',
    platform: 'youtube',
    title: 'title here',
    description: 'description here',
    thumbnail: '/assets/images/thumbs/thumb.jpg',
    total_time: 'T1M33S',
    start_time: '10',
    classes: 'additional-class',
    controls: 1,
    info: 1,
    inview: false,
    image: {
        preload: 'https://i.vimeocdn.com/video/301621689_10.jpg',
        image: 'https://i.vimeocdn.com/video/301621689_1024.jpg',
        srcset: 'https://i.vimeocdn.com/video/301621689_320.jpg 320w, https://i.vimeocdn.com/video/301621689_480.jpg 480w, https://i.vimeocdn.com/video/301621689_768.jpg 768w, https://i.vimeocdn.com/video/301621689_1024.jpg 1024w, https://i.vimeocdn.com/video/301621689_1280.jpg 1280w, https://i.vimeocdn.com/video/301621689_1440.jpg 1440w'
    }
}) }}
```

### Native video

You can initialise native video elements with srcset detect, it will pick the closest source based on you screen size and the available source sizes.

```javascript
import '@utilities/in-view'
import '@components/image'
import VideoLoader from '@components/video/loader'

VideoLoader.then(([Platforms, Video]) => {
  Video.default.registerPlatforms({
    native: Platforms.Native,
  })
}).catch(() => {})
```

```htmlmixed
{% from 'video.html' import video  %}

{{ video({
    instance_id: 1,
    id: '1',
    platform: 'native',
    title: 'title here',
    description: 'description here',
    thumbnail: '/assets/images/thumbs/thumb.jpg',
    total_time: 'T1M33S',
    start_time: '10',
    classes: 'additional-class',
    controls: 1,
    closedcaptions: [
        {
            url: 'url to vtt file',
            label: 'Nederlands',
            lang: 'nl'
        }
    ],
    sources: [
        {
            size : 1920,
            source: [
                {
                    url: 'https://player.vimeo.com/external/220648427.hd.mp4?s=4c5127b6c7a102ca6ba0e4d39ead88c2af6c69f2&profile_id=119',
                    type: 'video/mp4'
                }
            ]
        },
        {
            size : 1280,
            source: [
                {
                    url: 'https://player.vimeo.com/external/220648427.hd.mp4?s=4c5127b6c7a102ca6ba0e4d39ead88c2af6c69f2&profile_id=174',
                    type: 'video/mp4'
                }
            ]
        },
        {
            size : 1024,
            source: [
                {
                    url: 'https://player.vimeo.com/external/220648427.hd.mp4?s=4c5127b6c7a102ca6ba0e4d39ead88c2af6c69f2&profile_id=174',
                    type: 'video/mp4'
                }
            ]
        },
        {
            size : 960,
            source: [
                {
                    url: 'https://player.vimeo.com/external/220648427.sd.mp4?s=ea1a963f2e26c1ceb0e018186579bb5ad03cabdc&profile_id=165',
                    type: 'video/mp4'
                }
            ]
        },
        {
            size : 640,
            source: [
                {
                    url: 'https://player.vimeo.com/external/220648427.sd.mp4?s=ea1a963f2e26c1ceb0e018186579bb5ad03cabdc&profile_id=164',
                    type: 'video/mp4'
                }
            ]
        }
    ]
}) }}
```

## Dependencies

- [Image component](/components/image/)
- [Cookie component](/components/cookies/)
- [Events utility](/utilities/events/)
- [In-view utility](/utilities/in-view/)
- [youtube-player](https://github.com/gajus/youtube-player)
- [@vimeo/player](https://www.npmjs.com/package/@vimeo/player)

## Developers

- [Adrian Klingen](mailto:adrian.klingen@deptagency.com)

## Changelog

### 1.1.0

- Added cookie message

### 1.0.2

- Changed export in Javascript to singleton, to prevent multiple instances.

### 1.0.0

- Initial version
