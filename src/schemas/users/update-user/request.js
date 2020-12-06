module.exports = {
  $id: 'update-user',
  type: 'object',
  required: ['name', 'favorites', 'subscribe', 'email'],
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    favorites: { type: 'array', items: { type: 'string' } },
    subscribe: { type: 'boolean' },
  },
}
