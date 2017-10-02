/**
 * Filter properties in payload by predefined rules
 * @param {Object} payload
 * @return {Array}
 */
module.exports = (payload) => {
  let result = payload.filter(property => property.workflow === 'completed' && property.type === 'htv')
                     .map((property) => {
                       let address = property.address || {};

                       // TODO: Not clear from requirements if missing address is an error?
                       // If missing is an error it could be thrown here throw new Error('Missing address for property');

                       return {
                         concataddress: `${address.buildingNumber} ${address.street} ${address.suburb} ${address.state} ${address.postcode}`,
                         type: property.type,
                         workflow: property.workflow
                       };
                     });
  return result;
};
