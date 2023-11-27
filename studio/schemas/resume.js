import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

// sanity.io resume schema

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description:
        'The name of the educational institution or company name can be written in this field.',
    }),
    defineField({
      name: 'image',
      title: 'Educational institution or company image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'startDate',
      title: 'StartDate',
      type: 'date',
      options: {dateFormat: 'MMMM YYYY'},
      description: 'If you do not select the Start Date, the current date is selected by default.',
    }),
    defineField({
      name: 'endDate',
      title: 'EndDate',
      type: 'date',
      options: {dateFormat: 'MMMM YYYY'},
      description: "If you don't choose End Date, it will show as Present by default.",
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Education', value: 'education'},
          {title: 'Experience', value: 'experience'},
        ],
      },
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    orderRankField({type: 'resume'}),
  ],
})
