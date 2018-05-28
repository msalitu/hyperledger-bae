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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { DataService } from './data.service';
import { AppComponent } from './app.component';
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

  @NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DatasetComponent,
    OfferingComponent,
    TangleStreamComponent,
    AgreementComponent,
    SellerComponent,
    CustomerComponent,
    CreateDatasetComponent,
    MakeAgreementComponent,
    CreateOfferingComponent,
    PaymentCompletedComponent,
    AcceptAgreementComponent,
    SettleAgreementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
