import {defineField, defineType} from 'sanity'

// sanity.io about schema

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'job',
      title: 'Job Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'About Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'file',
      title: 'Resume File',
      type: 'file',
      description: 'Please select only pdf file.',
      options: {
        accept: '.pdf',
      },
    }),
  ],
})
