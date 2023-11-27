import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'
import {defineField, defineType} from 'sanity'

// sanity.io portfolio schema

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: (Rule) => Rule.max(1).required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'more',
      title: 'More Details',
      type: 'blockContent',
    }),
    defineField({
      name: 'image',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'file',
      title: 'Project File',
      type: 'file',
      description: 'Please select only pdf file. Not required!',
      options: {
        accept: '.pdf',
      },
    }),
    defineField({
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Not required!',
    }),
    orderRankField({type: 'portfolio'}),
  ],
})
