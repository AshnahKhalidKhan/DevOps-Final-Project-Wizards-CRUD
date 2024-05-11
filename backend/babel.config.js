// module.exports = {
//     presets: [
//         [
//             '@babel/preset-env',
//             {
//                 targets: {
//                     node: 'current',
//                 },
//             },
//         ],
//     ],
// };


module.exports = async function () {
    return {
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    };
  };
  