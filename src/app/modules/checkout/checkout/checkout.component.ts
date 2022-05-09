import {Component, OnInit} from '@angular/core';
import {Product} from "../../../shared/interfaces/product";
import {StepsEnum} from "../../../shared/enums/steps.enum";
import {StorageKeys} from "../../../shared/enums/storageKeys";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StorageService} from "../../../services/localstorage-service/storage.service";
import {UserCredentials} from "../../../shared/interfaces/user-credentials";

@Component({
    selector: 'app-checkout', templateUrl: './checkout.component.html', styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent implements OnInit {
    public step: number;
    public steps = StepsEnum;
    public products: Product[];
    public amount: number = 0;
    public quantity: number = 0;
    public orderNumber: number = 0;
    public checkoutForm: FormGroup;
    public cardNumber: string[] = [];
    public userCredentials: UserCredentials;

    constructor(private readonly storageService: StorageService, private readonly formBuilder: FormBuilder) {
        this.products = this.storageService.getItem(StorageKeys.Product) || 0;
        this.quantity = this.storageService.getItem(StorageKeys.Quantity) || 0;
        this.userCredentials = this.storageService.getItem(StorageKeys.UserCredentials);
        this.step = this.userCredentials ? StepsEnum.stepTwo : StepsEnum.stepOne;

        this.checkoutForm = this.initForm();
    }

    ngOnInit(): void {
        this.calculateAmount(this.products);
    }

    private initForm(): FormGroup {
        return this.formBuilder.group({
            email: [this.userCredentials.email, [Validators.required, Validators.email]],
            fullName: [this.userCredentials.fullName, [Validators.required]],
            address: [this.userCredentials.address, [Validators.required]],
            phone: [this.userCredentials.phone, [Validators.required, Validators.pattern("^[0-9]*$")]],
            cardNumber: [this.userCredentials.cardNumber || '', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(16), Validators.maxLength(16)]],
            cvv: [this.userCredentials.cvv, [Validators.required, Validators.minLength(3), Validators.maxLength(3), Validators.pattern("^[0-9]*$")]],
        })
    }

    private calculateAmount(products: Product[]): void {
        products.forEach((product: Product) => {
            this.amount += product.quantity * product.price;
        })
    }

    public submitForm(): void {
        if (this.checkoutForm.valid) {
            this.changeStep(StepsEnum.stepTwo);
            this.storageService.setItem(StorageKeys.UserCredentials, this.checkoutForm.value)
            const cardNumber = CheckoutComponent.hideNumber(this.checkoutForm.get('cardNumber')?.value);
            // @ts-ignore
            this.cardNumber = Array.from(cardNumber.match(/.{1,4}/g));
        }
    }

    private static hideNumber(str: string): string {
        if (!str) {
            return '';
        }
        const modifiedStr = str.split('')
        modifiedStr.splice(4, 8, '*', '*', '*', '*', '*', '*', '*', '*');
        return modifiedStr.join('');
    }

    public order(): void {
        this.orderNumber = Math.floor(Math.random() * 10000000000);
        this.changeStep(StepsEnum.stepThree)
    }

    public changeStep(step: number): void {
        this.step = step;
    }

}
