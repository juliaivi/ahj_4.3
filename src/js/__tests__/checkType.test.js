import checksType from '../checkType';

test('type checking, type is located', () => {
  const number = 4;
  const dataCardsOne = [
    {
      type: 'visa',
      starts: [4],
      length: 16,
    },
    {
      type: 'mir',
      starts: [2],
      length: 16,
    },

  ];

  expect(() => checksType(dataCardsOne, number)).toBeTruthy();
});

test('type checking, type is located', () => {
  const number = 4;
  const dataCardsOne = [
    {
      type: 'visa',
      starts: [4],
      length: 16,
    },
    {
      type: 'mir',
      starts: [2],
      length: 16,
    },

  ];

  const expectid = {
    type: 'visa',
    starts: [4],
    length: 16,
  };

  expect(checksType(dataCardsOne, number)).toEqual(expectid);
});

test('type checking. No such type', () => {
  const number = 5;
  const dataCardsOne = [
    {
      type: 'visa',
      starts: [4],
      length: 16,
    },
    {
      type: 'mir',
      starts: [2],
      length: 16,
    },

  ];

  expect(checksType(dataCardsOne, number)).toBeFalsy();
});
// ......................... Дополнение ко второму  методу
// test('type checking, type is located', () => {
//   const number = 7;
//   const dataCardsOne = [
//     {
//       type: 'visa',
//       starts: [4],
//       length: 16,
//     },
//     {
//       type: 'mir',
//       starts: [2],
//       length: 16,
//     },

//   ];

//   expect(checksType(dataCardsOne, number)).toBeUndefined();
// });
