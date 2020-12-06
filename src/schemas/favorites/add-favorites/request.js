module.exports = {
  $id: 'add-favorites',
  type: 'object',
  required: ['favorites'],
  properties: {
    favorites: { type: 'array', items: { type: 'string' } },
  },
}
