// Line spacing or Line break

export default {
  name: 'break',
  type: 'object',
  title: 'Break',
  fields: [
    {
      name: 'style',
      type: 'string',
      title: 'Break style',
      options: {
        list: [
          {title: 'Line spacing', value: 'lineSpacing'},
          {title: 'Line break', value: 'lineBreak'},
        ],
      },
    },
  ],
}
