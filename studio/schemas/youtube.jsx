import React from 'react'

import getVideoId from 'get-video-id'
import YouTube from 'react-youtube'

// To use sanity.io YouTube videos
const Preview = (props) => {
  const {url, renderDefault} = props

  if (!url) return <div>Missing YouTube URL</div>
  const id = getVideoId(url)
  return (
    <div>
      {renderDefault({...props, title: 'YouTube Embed'})}
      <YouTube videoId={id.id} />
    </div>
  )
}

export default {
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    },
  ],
  preview: {
    select: {
      url: 'url',
    },
  },
  components: {
    preview: Preview,
  },
}
