// sanity.io button schema

export default {
  name: 'button',
  type: 'object',
  title: 'Button',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
    },
  ],
}
