const axios = require('axios');
const herder = {
  'Content-Type': 'application/json',
  Username: 'voxpro',
  Password: 'Voxlog96',
  AccessLicenseNumber: 'AD8BC58B6BA50A15'
  //   transId: 'Tran123',
  //   transactionSrc: 'XOLT'
};
const shipper_details = {
  name: 'Lyle Loosle',
  address_line: '2222 South 950 East',
  city: 'PROVO',
  state_code: 'UT',
  postal_code: '84606',
  country_code: 'US'
};
const account_number = 'V61W67';
// const url = 'https://onlinetools.ups.com/ship/v1/rating/Rate';
const rating_url = 'https://wwwcie.ups.com/ship/v1/rating/Rate';
const shipment_url = 'https://wwwcie.ups.com/ship/v1/freight/shipments/ground';

// export const getRatingListForUps = async reqObj => {
//   return new Promise(async (resolve, reject) => {
//     const reqData = {
//       RateRequest: {
//         Request: {
//           RequestOption: 'Shop'
//           //   SubVersion: '1703',
//           //   TransactionReference: {
//           //     CustomerContext: ''
//           //   }
//         },
//         Shipment: {
//           ShipmentRatingOptions: {
//             UserLevelDiscountIndicator: 'TRUE'
//           },
//           Shipper: {
//             Name: shipper_details.name,
//             ShipperNumber: '',
//             Address: {
//               AddressLine: shipper_details.address_line,
//               City: shipper_details.city,
//               StateProvinceCode: shipper_details.state_code,
//               PostalCode: shipper_details.postal_code,
//               CountryCode: shipper_details.country_code
//             }
//           },
//           ShipTo: {
//             Name: reqObj.first_name + ' ' + reqObj.last_name,
//             Address: {
//               AddressLine: reqObj.address_line,
//               City: reqObj.city,
//               StateProvinceCode: reqObj.state_province_code,
//               PostalCode: reqObj.postal_code,
//               CountryCode: reqObj.country_code
//             }
//           },
//           ShipFrom: {
//             Name: shipper_details.name,
//             Address: {
//               AddressLine: shipper_details.address_line,
//               City: shipper_details.city,
//               StateProvinceCode: shipper_details.state_code,
//               PostalCode: shipper_details.postal_code,
//               CountryCode: shipper_details.country_code
//             }
//           },
//           Service: {
//             Code: '03',
//             Description: 'Ground'
//           },
//           ShipmentTotalWeight: {
//             UnitOfMeasurement: {
//               Code: 'LBS',
//               Description: 'Pounds'
//             },
//             Weight: reqObj.total_weight
//           },
//           Package: {
//             PackagingType: {
//               Code: '02',
//               Description: 'Package'
//             },
//             PackageWeight: {
//               UnitOfMeasurement: {
//                 Code: 'LBS'
//               },
//               Weight: reqObj.total_weight
//             }
//           }
//         }
//       }
//     };
//     const data = JSON.stringify(reqData);

//     const config = {
//       method: 'post',
//       url: rating_url,
//       headers: herder,
//       data: data
//     };

//     await axios(config)
//       .then(async response => {
//         // let resData = await JSON.stringify(response.data);
//         const msgRes = response.data.RateResponse.RatedShipment.TotalCharges;
//         resolve(msgRes);
//       })
//       .catch(error => {
//         // throw new Error(error.message);
//         const msgErr = error.response.data.response.errors[0].message;
//         console.log(msgErr);
//         reject(msgErr);
//       });
//   });
// };

export const getRatingListForUps = async reqObj => {
  return new Promise(async (resolve, reject) => {
    const reqData = {
      RateRequest: {
        Request: {
          RequestOption: 'Shop'
          //   SubVersion: '1703',
          //   TransactionReference: {
          //     CustomerContext: ''
          //   }
        },
        Shipment: {
          ShipmentRatingOptions: {
            UserLevelDiscountIndicator: 'TRUE'
          },
          Shipper: {
            Name: shipper_details.name,
            ShipperNumber: '',
            Address: {
              AddressLine: shipper_details.address_line,
              City: shipper_details.city,
              StateProvinceCode: shipper_details.state_code,
              PostalCode: shipper_details.postal_code,
              CountryCode: shipper_details.country_code
            }
          },
          ShipTo: {
            Name: reqObj.first_name + ' ' + reqObj.last_name,
            Address: {
              AddressLine: reqObj.address_line,
              City: reqObj.city,
              StateProvinceCode: reqObj.state_province_code,
              PostalCode: reqObj.postal_code,
              CountryCode: reqObj.country_code
            }
          },
          ShipFrom: {
            Name: shipper_details.name,
            Address: {
              AddressLine: shipper_details.address_line,
              City: shipper_details.city,
              StateProvinceCode: shipper_details.state_code,
              PostalCode: shipper_details.postal_code,
              CountryCode: shipper_details.country_code
            }
          },
          Service: {
            Code: '03',
            Description: 'Ground'
          },
          ShipmentTotalWeight: {
            UnitOfMeasurement: {
              Code: 'LBS',
              Description: 'Pounds'
            },
            Weight: reqObj.total_weight
          },
          Package: {
            PackagingType: {
              Code: '02',
              Description: 'Package'
            },
            PackageWeight: {
              UnitOfMeasurement: {
                Code: 'LBS'
              },
              Weight: reqObj.total_weight
            },
            LargePackageIndicator: {}
          }
        }
      }
    };
    const data = JSON.stringify(reqData);

    const config = {
      method: 'post',
      url: rating_url,
      headers: herder,
      data: data
    };

    await axios(config)
      .then(async response => {
        // let resData = await JSON.stringify(response.data);
        const msgRes = response.data.RateResponse.RatedShipment.TotalCharges;
        resolve(msgRes);
      })
      .catch(error => {
        // throw new Error(error.message);
        const msgErr = error.response.data.response.errors[0].message;
        console.log(msgErr);
        reject(msgErr);
      });
  });
};

export const shipmentDetailsForUps = async reqObj => {
  return new Promise(async (resolve, reject) => {
    var data = JSON.stringify({
      FreightShipRequest: {
        Shipment: {
          ShipFrom: {
            Name: shipper_details.name,
            Address: {
              AddressLine: shipper_details.address_line,
              City: shipper_details.city,
              StateProvinceCode: shipper_details.state_code,
              PostalCode: shipper_details.postal_code,
              CountryCode: shipper_details.country_code
            },
            AttentionName: shipper_details.name,
            Phone: { Number: '111-222-3444' }
          },
          ShipperNumber: account_number,
          ShipTo: {
            Name: reqObj.first_name + ' ' + reqObj.last_name,
            Address: {
              AddressLine: reqObj.address_line,
              City: reqObj.city,
              StateProvinceCode: reqObj.state_province_code,
              PostalCode: reqObj.postal_code,
              CountryCode: reqObj.country_code
            }
          },
          PaymentInformation: {
            Payer: {
              Name: reqObj.first_name + ' ' + reqObj.last_name,
              Address: {
                AddressLine: reqObj.address_line,
                City: reqObj.city,
                StateProvinceCode: reqObj.state_province_code,
                PostalCode: reqObj.postal_code,
                CountryCode: reqObj.country_code
              }
            },
            ShipmentBillingOption: { Code: '10' }
          },
          Service: { Code: '308' },
          HandlingUnitOne: { Quantity: '1', Type: { Code: 'LOO' } },
          Commodity: {
            Description: 'Goods',
            Weight: {
              UnitOfMeasurement: { Code: 'LBS' },
              Value: parseFloat(reqObj.total_weight).toString()
            },
            NumberOfPieces: reqObj.number_of_piece.toString(),
            PackagingType: { Code: 'LOO' },
            FreightClass: '175'
          }
        }
      }
    });

    var config = {
      method: 'post',
      url: shipment_url,
      headers: herder,
      data: data
    };

    await axios(config)
      .then(async response => {
        let responseObj = {
          ShipmentNumber: response.data.FreightShipResponse.ShipmentResults.ShipmentNumber,
          TotalCharges: response.data.FreightShipResponse.ShipmentResults.TotalShipmentCharge
        };
        resolve(responseObj);
      })
      .catch(error => {
        console.log(error, '=== error shipment');
        const msgErr = error.response.data.response.errors[0].message;
        // console.log(error.response.msgErr);
        reject(msgErr);
      });
  });
};
