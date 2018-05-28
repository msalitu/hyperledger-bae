/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

import { DatasetComponent } from './Dataset/Dataset.component';
import { OfferingComponent } from './Offering/Offering.component';
import { TangleStreamComponent } from './TangleStream/TangleStream.component';
import { AgreementComponent } from './Agreement/Agreement.component';

import { SellerComponent } from './Seller/Seller.component';
import { CustomerComponent } from './Customer/Customer.component';

import { CreateDatasetComponent } from './CreateDataset/CreateDataset.component';
import { MakeAgreementComponent } from './MakeAgreement/MakeAgreement.component';
import { CreateOfferingComponent } from './CreateOffering/CreateOffering.component';
import { PaymentCompletedComponent } from './PaymentCompleted/PaymentCompleted.component';
import { AcceptAgreementComponent } from './AcceptAgreement/AcceptAgreement.component';
import { SettleAgreementComponent } from './SettleAgreement/SettleAgreement.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'Dataset', component: DatasetComponent },
  { path: 'Offering', component: OfferingComponent },
  { path: 'TangleStream', component: TangleStreamComponent },
  { path: 'Agreement', component: AgreementComponent },
  { path: 'Seller', component: SellerComponent },
  { path: 'Customer', component: CustomerComponent },
  { path: 'CreateDataset', component: CreateDatasetComponent },
  { path: 'MakeAgreement', component: MakeAgreementComponent },
  { path: 'CreateOffering', component: CreateOfferingComponent },
  { path: 'PaymentCompleted', component: PaymentCompletedComponent },
  { path: 'AcceptAgreement', component: AcceptAgreementComponent },
  { path: 'SettleAgreement', component: SettleAgreementComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule],
 providers: []
})
export class AppRoutingModule { }
