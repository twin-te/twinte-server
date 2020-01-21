test('hoge', () => {
  console.log(process.env.STRIPE_API_KEY)
  expect(2 + 2).toBe(4)
})
