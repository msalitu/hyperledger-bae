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

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { AgreementService } from './Agreement.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-agreement',
  templateUrl: './Agreement.component.html',
  styleUrls: ['./Agreement.component.css'],
  providers: [AgreementService]
})
export class AgreementComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  agreementId = new FormControl('', Validators.required);
  timestamp = new FormControl('', Validators.required);
  state = new FormControl('', Validators.required);
  queryStream = new FormControl('', Validators.required);
  dataStream = new FormControl('', Validators.required);
  offer = new FormControl('', Validators.required);
  customer = new FormControl('', Validators.required);

  constructor(private serviceAgreement: AgreementService, fb: FormBuilder) {
    this.myForm = fb.group({
      agreementId: this.agreementId,
      timestamp: this.timestamp,
      state: this.state,
      queryStream: this.queryStream,
      dataStream: this.dataStream,
      offer: this.offer,
      customer: this.customer
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceAgreement.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the asset field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the asset updateDialog.
   * @param {String} name - the name of the asset field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified asset field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }

  addAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.conwet.biznet.Agreement',
      'agreementId': this.agreementId.value,
      'timestamp': this.timestamp.value,
      'state': this.state.value,
      'queryStream': this.queryStream.value,
      'dataStream': this.dataStream.value,
      'offer': this.offer.value,
      'customer': this.customer.value
    };

    this.myForm.setValue({
      'agreementId': null,
      'timestamp': null,
      'state': null,
      'queryStream': null,
      'dataStream': null,
      'offer': null,
      'customer': null
    });

    return this.serviceAgreement.addAsset(this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
      this.myForm.setValue({
        'agreementId': null,
        'timestamp': null,
        'state': null,
        'queryStream': null,
        'dataStream': null,
        'offer': null,
        'customer': null
      });
    })
    .catch((error) => {
      if (error === 'Server error') {
          this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else {
          this.errorMessage = error;
      }
    });
  }


  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: 'org.conwet.biznet.Agreement',
      'timestamp': this.timestamp.value,
      'state': this.state.value,
      'queryStream': this.queryStream.value,
      'dataStream': this.dataStream.value,
      'offer': this.offer.value,
      'customer': this.customer.value
    };

    return this.serviceAgreement.updateAsset(form.get('agreementId').value, this.asset)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceAgreement.deleteAsset(this.currentId)
    .toPromise()
    .then(() => {
      this.errorMessage = null;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceAgreement.getAsset(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'agreementId': null,
        'timestamp': null,
        'state': null,
        'queryStream': null,
        'dataStream': null,
        'offer': null,
        'customer': null
      };

      if (result.agreementId) {
        formObject.agreementId = result.agreementId;
      } else {
        formObject.agreementId = null;
      }

      if (result.timestamp) {
        formObject.timestamp = result.timestamp;
      } else {
        formObject.timestamp = null;
      }

      if (result.state) {
        formObject.state = result.state;
      } else {
        formObject.state = null;
      }

      if (result.queryStream) {
        formObject.queryStream = result.queryStream;
      } else {
        formObject.queryStream = null;
      }

      if (result.dataStream) {
        formObject.dataStream = result.dataStream;
      } else {
        formObject.dataStream = null;
      }

      if (result.offer) {
        formObject.offer = result.offer;
      } else {
        formObject.offer = null;
      }

      if (result.customer) {
        formObject.customer = result.customer;
      } else {
        formObject.customer = null;
      }

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });
  }

  resetForm(): void {
    this.myForm.setValue({
      'agreementId': null,
      'timestamp': null,
      'state': null,
      'queryStream': null,
      'dataStream': null,
      'offer': null,
      'customer': null
      });
  }

}
