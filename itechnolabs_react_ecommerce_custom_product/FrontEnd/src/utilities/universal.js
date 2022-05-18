import _ from "underscore";

export const getResizeImageURL = async (img) => {
  var dataurl;
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  // var MAX_WIDTH = 1024;
  // var MAX_HEIGHT = 768;
  var width = img.width / 2;
  var height = img.height / 2;

  // if (width > height) {
  // if (width > MAX_WIDTH) {
  //     height *= MAX_WIDTH / width;
  //     width = MAX_WIDTH;
  // }
  // } else {
  // if (height > MAX_HEIGHT) {
  //     width *= MAX_HEIGHT / height;
  //     height = MAX_HEIGHT;
  // }
  // }
  canvas.width = width;
  canvas.height = height;
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);
  dataurl = canvas.toDataURL("image/png");
  return dataurl;
};
export const calculateImageSize = (base64String) => {
  let padding, inBytes, base64StringLength;
  if (base64String.endsWith("==")) padding = 2;
  else if (base64String.endsWith("=")) padding = 1;
  else padding = 0;

  base64StringLength = base64String.length;
  console.log(base64String);
  console.log(base64StringLength);
  inBytes = (base64StringLength / 4) * 3 - padding;
  console.log(inBytes / 1024 / 1024);
  if (inBytes / 1024 / 1024 <= 2) {
    return true;
  } else {
    return false;
  }
  // return this.kbytes;
};

export const getMarkupCost = (flag, no_of_color, quantity, price) => {
  //flag is decorating method here
  const qty_range_arr = {
    1: {
      markup_pricing: [
        {
          range_from: 24,
          range_to: 49,
          cost: flag == "Print" ? 1.52 : 3.13,
          markup_cost: 60,
        }, //markup cost is in %  and range from/to is as per quantity
        {
          range_from: 50,
          range_to: 71,
          cost: flag == "Print" ? 1.15 : 3.13,
          markup_cost: 58,
        },
        {
          range_from: 72,
          range_to: 99,
          cost: flag == "Print" ? 1.03 : 3.08,
          markup_cost: 56,
        },
        {
          range_from: 100,
          range_to: 149,
          cost: flag == "Print" ? 0.86 : 3.04,
          markup_cost: 54,
        },
        {
          range_from: 150,
          range_to: 214,
          cost: flag == "Print" ? 0.69 : 3.04,
          markup_cost: 52,
        },
        {
          range_from: 215,
          range_to: 359,
          cost: flag == "Print" ? 0.56 : 3.0,
          markup_cost: 50,
        },
        {
          range_from: 360,
          range_to: 499,
          cost: flag == "Print" ? 0.54 : 2.98,
          markup_cost: 48,
        },
        {
          range_from: 500,
          range_to: 999,
          cost: flag == "Print" ? 0.49 : 2.98,
          markup_cost: 46,
        },
        {
          range_from: 1000,
          range_to: 1999,
          cost: flag == "Print" ? 0.42 : 2.98,
          markup_cost: 44,
        },
      ],
      setup_costs: flag == "Print" ? 20 : 45, // in $
    },
    2: {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 2.52, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 1.56, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 1.4, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.1, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 0.86, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.65, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.63, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.57, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.48, markup_cost: 44 },
      ],
      setup_costs: flag == "Print" ? 30 : 45, // in $
    },
    3: {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 2.98, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 1.99, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 1.78, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.37, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.04, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.77, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.72, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.65, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.55, markup_cost: 44 },
      ],
      setup_costs: flag == "Print" ? 40 : 45, // in $
    },
    4: {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 3.54, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 2.38, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 2.24, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.66, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.24, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.9, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.84, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.74, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.61, markup_cost: 44 },
      ],
      setup_costs: flag == "Print" ? 50 : 45, // in $
    },
    5: {
      markup_pricing: [
        { range_from: 24, range_to: 49, cost: 4.12, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 2.8, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 2.72, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.93, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.38, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 1.04, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.97, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.83, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.69, markup_cost: 44 },
      ],
      setup_costs: flag == "Print" ? 60 : 45, // in $
    },
  };

  let selected_obj = qty_range_arr[no_of_color].markup_pricing;
  const setup_cost = qty_range_arr[no_of_color].setup_costs;
  selected_obj = _.filter(selected_obj, (obj) => {
    return quantity >= obj.range_from && quantity <= obj.range_to;
  });
  if (selected_obj.length) {
    const cost_each = parseFloat(price) + selected_obj[0].cost;
    const cost_quantity = cost_each * quantity;
    const markup_of = (cost_quantity * selected_obj[0].markup_cost) / 100;
    const markup_cost = cost_quantity + markup_of;
    const total_cost = markup_cost + setup_cost;
    return { markup_cost, setup_cost, total_cost };
  } else {
    return { markup_cost: 0, setup_cost: 0, total_cost: 0 };
  }
};

export const getPriceAccordingSize = (
  available_size_price,
  select_qty_array,
  no_of_color,
  print_method,
  setup_fee
) => {
  // console.log(
  //   "getPriceAccordingSize",
  //   available_size_price,
  //   select_qty_array,
  //   no_of_color,
  //   print_method
  // );
  print_method = print_method ? print_method : "Print";
  let final_price_array = select_qty_array.map((elem) => {
    let Total_qty = 0,
      total_price = 0;
    const { color, size_to_buy } = elem;
    Object.entries(size_to_buy).map(([size_key, qty_value]) => {
      let match_size_color = _.findWhere(available_size_price, {
        size: size_key,
        color_name: color,
      });
      if (match_size_color) {
        let qty_price = qty_value * match_size_color.piece_price;
        total_price = total_price + Number(qty_price);
        Total_qty = Total_qty + Number(qty_value);
      }
    });
    let item_price = total_price / Total_qty;
    if (no_of_color) {
      let markup_setup = getColorCost(print_method, no_of_color, Total_qty,setup_fee);
      // item cost with color cost
      const item_price_with_color = item_price + markup_setup.cost;
      // item cost with markup cost
      const markup_with_single =
        (item_price_with_color * markup_setup.markup_cost) / 100;
      const markup_cost = item_price_with_color + markup_with_single;
      // Total quantity cost with color markup
      const final_cost = markup_cost * Total_qty;

      let resObj = {
        item_price: item_price_with_color,
        markup_cost: final_cost,
        setup_cost: markup_setup.setup_cost,
      };
      return resObj;
    } else {
      let resObj = {
        item_price: item_price,
        markup_cost: total_price,
        setup_cost: 0,
      };
      return resObj;
    }
  });
  return final_price_array;
};

const getColorCost = (flag, no_of_color, quantity,setup_fee) => {
  //flag is decorating method here
  const qty_range_arr = {
    1: {
      markup_pricing: [
        {
          range_from: 12,
          range_to: 49,
          cost: flag == "Print" ? 1.52 : 3.13,
          markup_cost: 60,
        }, //markup cost is in %  and range from/to is as per quantity
        {
          range_from: 50,
          range_to: 71,
          cost: flag == "Print" ? 1.15 : 3.13,
          markup_cost: 58,
        },
        {
          range_from: 72,
          range_to: 99,
          cost: flag == "Print" ? 1.03 : 3.08,
          markup_cost: 56,
        },
        {
          range_from: 100,
          range_to: 149,
          cost: flag == "Print" ? 0.86 : 3.04,
          markup_cost: 54,
        },
        {
          range_from: 150,
          range_to: 214,
          cost: flag == "Print" ? 0.69 : 3.04,
          markup_cost: 52,
        },
        {
          range_from: 215,
          range_to: 359,
          cost: flag == "Print" ? 0.56 : 3.0,
          markup_cost: 50,
        },
        {
          range_from: 360,
          range_to: 499,
          cost: flag == "Print" ? 0.54 : 2.98,
          markup_cost: 48,
        },
        {
          range_from: 500,
          range_to: 999,
          cost: flag == "Print" ? 0.49 : 2.98,
          markup_cost: 46,
        },
        {
          range_from: 1000,
          range_to: 1999,
          cost: flag == "Print" ? 0.42 : 2.98,
          markup_cost: 44,
        },
      ],
      setup_costs: flag == "Print" ? 20 : 45, // in $
    },
    2: {
      markup_pricing: [
        { range_from: 12, range_to: 49, cost: 2.52, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 1.56, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 1.4, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.1, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 0.86, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.65, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.63, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.57, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.48, markup_cost: 44 },
      ],
      setup_costs: flag == "Print" ? 30 : 45, // in $
    },
    3: {
      markup_pricing: [
        { range_from: 12, range_to: 49, cost: 2.98, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 1.99, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 1.78, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.37, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.04, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.77, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.72, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.65, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.55, markup_cost: 44 },
      ],
      setup_costs: flag == "Print" ? 40 : 45, // in $
    },
    4: {
      markup_pricing: [
        { range_from: 12, range_to: 49, cost: 3.54, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 2.38, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 2.24, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.66, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.24, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 0.9, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.84, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.74, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.61, markup_cost: 44 },
      ],
      setup_costs: flag == "Print" ? 50 : 45, // in $
    },
    5: {
      markup_pricing: [
        { range_from: 12, range_to: 49, cost: 4.12, markup_cost: 60 },
        { range_from: 50, range_to: 71, cost: 2.8, markup_cost: 58 },
        { range_from: 72, range_to: 99, cost: 2.72, markup_cost: 56 },
        { range_from: 100, range_to: 149, cost: 1.93, markup_cost: 54 },
        { range_from: 150, range_to: 214, cost: 1.38, markup_cost: 52 },
        { range_from: 215, range_to: 359, cost: 1.04, markup_cost: 50 },
        { range_from: 360, range_to: 499, cost: 0.97, markup_cost: 48 },
        { range_from: 500, range_to: 999, cost: 0.83, markup_cost: 46 },
        { range_from: 1000, range_to: 1999, cost: 0.69, markup_cost: 44 },
      ],
      setup_costs: flag == "Print" ? 60 : 45, // in $
    },
  };

  let selected_obj = qty_range_arr[no_of_color].markup_pricing;
  const setup_cost = qty_range_arr[no_of_color].setup_costs;
  selected_obj = _.filter(selected_obj, (obj) => {
    return quantity >= obj.range_from && quantity <= obj.range_to;
  });
  /*if (selected_obj.length) {
    return { ...selected_obj[0], setup_cost };
  } else {
    return {
      range_from: 0,
      range_to: 0,
      cost: 0,
      markup_cost: 0,
      setup_cost: 0,
    };
  }
  */
 return {
  range_from: 0,
  range_to: 0,
  cost: 0,
  markup_cost: 0,
  setup_cost: setup_fee,
};
};

export const getTimeStampExpire = () => {
  return Date.now() + 30 * 60 * 1000;
};

export const getTimeStamp = () => {
  return Date.now();
};

export const getBase64Image = (url) => {
  if (url == null) return url;
  let base64;
  var img = new Image();
  img.src = url;
  img.crossOrigin = "Anonymous";
  img.onload = async () => {
    var canvas = document.createElement("CANVAS"),
      ctx = canvas.getContext("2d"),
      dataURL;
    canvas.height = img.height;
    canvas.width = img.width;
    ctx.drawImage(img, 0, 0);
    dataURL = canvas.toDataURL("image/png");
    console.log("dataURL", dataURL);
    // callback(dataURL);
    return dataURL;
    // base64 = dataURL;
    // console.log("base64", base64);
    // return base64;
  };
};

// export const getBase64Image = (url) => {
//   return new Promise((resolve, reject) => {
//     var img = new Image();
//     img.src = url;
//     img.crossOrigin = "Anonymous";
//     img.onload = async () => {
//       var canvas = document.createElement("CANVAS"),
//         ctx = canvas.getContext("2d"),
//         dataURL;
//       canvas.height = img.height;
//       canvas.width = img.width;
//       ctx.drawImage(img, 0, 0);
//       dataURL = canvas.toDataURL("image/png");
//       // console.log("dataURL", dataURL);
//       // callback(dataURL);
//       resolve(dataURL);
//       // base64 = dataURL;
//       // return base64;
//     };
//   });
// };
