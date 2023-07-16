import checkLuhn from '../checkmetodLuhn';

test('checking the Luna method, must be true', () => {
  const number = '4024007166128016';
  const result = checkLuhn(number);
  expect(result).toBeTruthy();
});

test('checking the Luna method, must be false', () => {
  const number = '4024007166128018';
  const result = checkLuhn(number);
  expect(result).toBeFalsy();
});
