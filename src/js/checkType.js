export default function checksType(el, num) {
  let typeElements = null;

  el.forEach((elem) => {
    if (elem.starts.includes(num) === true) {
      typeElements = elem;
    }
  });

  return typeElements;
}

// .........................  Второй вариант
// export default function checksType(el, num) {
//   let typeElements = null;
//   el.forEach((elem) => {
//     elem.starts.find((item) => {
//       if (item === num) {
//         typeElements = elem;
//       }
//       return typeElements;
//     });
//   });
//   return typeElements;
// }
