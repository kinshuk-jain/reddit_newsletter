module.exports = {
  $id: 'update-favorites',
  type: 'object',
  required: ['favorites'],
  properties: {
    favorites: { type: 'array', items: { type: 'string' } },
  },
}
