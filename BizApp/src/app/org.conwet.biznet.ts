import {Asset} from './org.hyperledger.composer.system';
import {Participant} from './org.hyperledger.composer.system';
import {Transaction} from './org.hyperledger.composer.system';
import {Event} from './org.hyperledger.composer.system';
// export namespace org.conwet.biznet{
   export enum PricingModel {
      ONE_TIME,
      RECURRING,
      USAGE,
   }
   export enum AgreementState {
      PAYMENT_PENDING,
      ACTIVE,
   }
   export abstract class User extends Participant {
      userId: string;
   }
   export class Seller extends User {
   }
   export class Customer extends User {
   }
   export class Dataset extends Asset {
      id: string;
      data: string;
      description: string;
      owner: Seller;
   }
   export class Offering extends Asset {
      offerId: string;
      pricingModel: PricingModel;
      dataset: Dataset;
   }
   export class TangleStream extends Asset {
      side_key: string;
      root: string;
   }
   export class Agreement extends Asset {
      agreementId: string;
      timestamp: Date;
      state: AgreementState;
      queryStream: TangleStream;
      dataStream: TangleStream;
      offer: Offering;
      customer: Customer;
   }
   export class CreateDataset extends Transaction {
      root: string;
      owner: Seller;
   }
   export class MakeAgreement extends Transaction {
      offering: Offering;
      customer: Customer;
      queryStream: TangleStream;
   }
   export class CreateOffering extends Transaction {
      offeringId: string;
      pricingModel: PricingModel;
      dataset: Dataset;
   }
   export class PaymentCompleted extends Transaction {
      agreement: Agreement;
      proofOfPayment: string;
   }
   export class AcceptAgreement extends Transaction {
      agreement: Agreement;
      dataStream: TangleStream;
   }
   export class SettleAgreement extends Transaction {
      agreement: Agreement;
      renew: boolean;
   }
   export class CreateDatasetEvent extends Event {
      root: string;
      owner: Seller;
   }
   export class MakeAgreementEvent extends Event {
      transactionId: string;
      offering: Offering;
      customer: Customer;
      queryStream: TangleStream;
   }
   export class CreateOfferingEvent extends Event {
      offeringId: string;
      pricingModel: PricingModel;
      dataset: Dataset;
   }
   export class PaymentCompletedEvent extends Event {
      agreement: Agreement;
      proofOfPayment: string;
   }
   export class AcceptAgreementEvent extends Event {
      agreement: Agreement;
      dataStream: TangleStream;
   }
   export class SettleAgreementEvent extends Event {
      agreement: Agreement;
      renew: boolean;
   }
// }
