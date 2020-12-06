module.exports = {
  $id: 'create-user',
  type: 'object',
  required: ['name', 'email'],
  properties: {
    name: { type: 'string' },
    email: { type: 'string' },
    favorites: { type: 'array', items: { type: 'string' } },
    subscribe: { type: 'boolean' },
  },
}
