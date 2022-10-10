import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService, Category } from '@vaas/products';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
    selector: 'admin-categories-list',
    templateUrl: './categories-list.component.html',
    styles: []
})
export class CategoriesListComponent implements OnInit {
    categories: Category[] = [];

    constructor(
        private messageService: MessageService,
        private categoriesService: CategoriesService,
        private confirmationService: ConfirmationService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this._getCategory();
    }

    deleteCategory(categoryId: string) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this Category?',
            header: 'Delete Category',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.categoriesService.deleteCategory(categoryId).subscribe(
                    () => {
                        this._getCategory();
                        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Category is deleted' });
                    },
                    () => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Category is not deleted' });
                    }
                );
            }
        });
    }

    updateCategory(categoryid: string) {
        this.router.navigateByUrl(`categories/form/${categoryid}`);
    }

    private _getCategory() {
        this.categoriesService.getCategories().subscribe((cats) => {
            this.categories = cats;
        });
    }
}
