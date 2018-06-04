/**
 * Track the agreemet between a seller and a customer to arrange a permission access for a dataset with a determined pricing model
 * @param {org.conwet.biznet.MakeAgreement} transaction - the MakeAgreement transaction
 * @transaction
 */
function makeAgreement(transaction) {
  
  console.log('makeAgreement');
  
  // Get the factory for creating new asset instances	
  var factory = getFactory();
  var namespace = 'org.conwet.biznet';
  
  // Create the agreement
  var agreementId = transaction.customer.userId + '_' + transaction.offering.offeringId;
  var newAgreement = factory.newResource(namespace, 'Agreement', agreementId);
  newAgreement.transactionId = transaction.transactionId;
  newAgreement.offering = transaction.offering;
  newAgreement.customer = transaction.customer;
  
  // Save the agreement
  return getAssetRegistry('org.conwet.biznet.Agreement')
  .then(function (assetRegistry) {
  	return assetRegistry.add(newAgreement);
  })
  
  // Emit the event
  .then(function() {
  	var makeAgreementEvent = factory.newEvent(namespace, 'MakeAgreementEvent');
   	makeAgreementEvent.transactionId = transaction.transactionId;
  	makeAgreementEvent.offering = transaction.offering;
  	makeAgreementEvent.customer = transaction.customer;
    emit(makeAgreementEvent);
  });
}



/**
 * A seller creates an offering for a dataset with a determined pricing model
 * @param {org.conwet.biznet.CreateOffering} transaction - the Createoffering transaction
 * @transaction
 */
function createOffering(transaction) {
  
  console.log('createOffering');
  
  // Get the factory for creating new asset instances	
  var factory = getFactory();
  var namespace = 'org.conwet.biznet';
  
  // Create the offering
  var newOffering = factory.newResource(namespace, 'Offering', transaction.offeringId);
  newOffering.pricingModel = transaction.pricingModel;
  newOffering.dataset = transaction.dataset;
  
  // Save the offering
  return getAssetRegistry('org.conwet.biznet.Offering')
  .then(function (assetRegistry) {
  	return assetRegistry.add(newOffering);
  })
  
  // Emit the event
  .then(function() {
  	var createOfferingEvent = factory.newEvent(namespace, 'CreateOfferingEvent');
   	createOfferingEvent.offeringId = transaction.offeringId;
  	createOfferingEvent.pricingModel = transaction.pricingModel;
  	createOfferingEvent.dataset = transaction.dataset;
    emit(createOfferingEvent);
  });
}


/**
 * Track the agreemet between a seller and a customer to arrange a permission access for a dataset with a determined pricing model
 * @param {org.conwet.biznet.CreateDataset} transaction - the MakeAgreement transaction
 * @transaction
 */
function createDataset(transaction) {
  
  console.log('createDataset');
  
  // Get the factory for creating new asset instances	
  var factory = getFactory();
  var namespace = 'org.conwet.biznet';
  
  // Create the dataset
  var newDataset = factory.newResource(namespace, 'Dataset', transaction.datasetId);
  newDataset.data = transaction.data;
  newDataset.description = transaction.description;
  newDataset.owner = transaction.owner;
  
  // Save the dataset
  return getAssetRegistry('org.conwet.biznet.Dataset')
  .then(function (assetRegistry) {
  	return assetRegistry.add(newDataset);
  })
  
  // Emit the event
  .then(function() {
  	var createDatasetEvent = factory.newEvent(namespace, 'CreateDatasetEvent');
   	createDatasetEvent.datasetId = transaction.datasetId;
    createDatasetEvent.owner = transaction.owner;
    createDatasetEvent.data = transaction.data;
    createDatasetEvent.description = transaction.description;
    emit(createDatasetEvent);
  });
}


