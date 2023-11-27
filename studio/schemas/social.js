import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

// sanity.io social schema

export default defineType({
  name: 'social',
  title: 'Social',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'name',
      title: 'Social name',
      type: 'string',
      options: {
        list: [
          {title: 'Instagram', value: 'instagram'},
          {title: 'Twitter (X)', value: 'twitter'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'Github', value: 'github'},
        ],
      },
    }),
    defineField({
      name: 'link',
      title: 'Social Link',
      type: 'url',
    }),
    orderRankField({type: 'social'}),
  ],
})
