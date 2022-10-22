import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, ProductsService } from '@vaas/products';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'admin-products-form',
    templateUrl: './products-form.component.html',
    styles: []
})
export class ProductsFormComponent implements OnInit {
    editmode = false;
    form: FormGroup;
    isSubmitted = false;
    categories = [];
    imageDisplay: string | ArrayBuffer;

    constructor(
        private formBuilder: FormBuilder,
        private productsService: ProductsService,
        private categoriesService: CategoriesService,
        private messageService: MessageService,
        private location: Location,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this._initForm();
        this._getCategories();
    }

    private _initForm() {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            price: ['', Validators.required],
            category: ['', Validators.required],
            description: ['', Validators.required],
            richDescription: [''],
            image: ['', Validators.required],
            isFeatured: [false]
        });
    }

    private _getCategories() {
        this.categoriesService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }
    onSubmit() {
        this.isSubmitted = true;
        if (this.form.invalid) return;

        const productFormData = new FormData();

        Object.keys(this.productForm).map((key) => {
            console.log(key);
            console.log(this.productForm[key].value);
        });
        // productFormData.append();
    }

    onCancel() {}

    onImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const fileReader = new FileReader();
            fileReader.onload = () => {
                this.imageDisplay = fileReader.result;
            };
            fileReader.readAsDataURL(file);
        }
    }

    get productForm() {
        return this.form.controls;
    }
}
