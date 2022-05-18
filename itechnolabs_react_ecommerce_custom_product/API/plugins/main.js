/* ------------------------------------------------------------------------------------------------
   * @ description : Here we are creating the home page plugin.
------------------------------------------------------------------------------------------------- */

import { Order, Payment, Products } from '../mysqlDb';

export default {
  name: 'Main',
  version: '1.0.0',
  register: (server, options) => {
    //for home page
    server.route({ path: '/{p*}', method: 'GET', handler: { file: 'main.html' } });
    server.route({
      path: '/webhook',
      method: 'POST',
      handler: async function(request, h) {
        let eventJson = request.payload;
        if (eventJson.type == 'payment_intent.succeeded') {
          console.log('*** enter in payment_intent.succeeded ***', eventJson);
          //check if customer exists for which payment has been made
          let jsonData = eventJson.data.object;
          let payment = await Payment.findOne({ payment_id: jsonData.id, status: false });
          if (payment) {
          } else {
            return { status: false };
          }
        } else if (eventJson.type == 'charge.captured') {
          try {
            console.log('*** enter in charge.captured ***', eventJson);
            let jsonData = eventJson.data.object;
            let order_details = await Order.findOne({
              where: { id: jsonData.metadata.order_id },
              raw: true
            });
            order_details = JSON.parse(JSON.stringify(order_details));
            if (order_details) {
              await Order.update({ order_status: 1 }, { where: { id: order_details.id } });
              await Payment.update(
                { payment_status: 1 },
                { where: { order_id: order_details.id } }
              );
              console.log(`Event capature status update successfully`);
              return { status: false };
            } else {
              return { status: false };
            }
          } catch (err) {
            // throw new Error(err.message);
            console.error('Error in event.capture => ', err);
          }
        }
      }
    });
  }
};
