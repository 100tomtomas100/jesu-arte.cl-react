const prices: { [key: string]: any } = {
  pencil: {
    s12cm_x_12cm: 5,
    s24cm_x_24cm: 10,
    s50cm_x_50cm: 20,
  },
  aquarelle: {
    s12cm_x_12cm: 10,
    s24cm_x_24cm: 20,
    s50cm_x_50cm: 35,
  },
  marker: {
    s12cm_x_12cm: 7,
    s24cm_x_24cm: 14,
    s50cm_x_50cm: 25,
  },
};

export default prices;

// {
//   pencil: {
//     cm12cm-x-12cm: "$5",
//     24cm-x-24cm: "$10",
//     "50cm x 50cm": "$20"
//   },
//   "aquarelle": {
//     "12cm x 12cm": "$10",
//     "24cm x 24cm": "$20",
//     "50cm x 50cm": "$35"
//   },
//   "marker": {
//     "12cm x 12cm": "$7",
//     "24cm x 24cm": "$14",
//     "50cm x 50cm": "$25"
//   }
// }
