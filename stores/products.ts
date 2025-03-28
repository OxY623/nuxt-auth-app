import {defineStore} from 'pinia';
import type {Product} from '../types';

export const useProductStore = defineStore('products', {
    state: () => ({
        products:[] as Product[],
        filteredProducts: [] as Product[],
        selectedCategories: [] as string[],
        dateRange: {
            start: '',
            end: ''
        }
    }),
    actions: {
        async fetchProducts(){
            this.products = await new Promise<Product[]>((resolve, reject) => {
                fetch('/products.json')
                    .then(response => response.json())
                    .then(data => setTimeout(() => resolve(data), 2000))
                    .catch(error => reject(error));
            }).catch(e => {
                console.log(e);
                return [];
            });
            this.filterProducts();
              
        },
        filterProducts() {
            let filtered = [...this.products];
            //console.log('Selected categories:', this.selectedCategories);

            if (this.selectedCategories.length > 0) {
              filtered = filtered.filter(i => {
                  const selectedCategoriesSet = new Set(this.selectedCategories);
                  const isCategorySelected = selectedCategoriesSet.has(i.category);
                  //console.log(`Checking product ${i.name} category ${i.category}: ${isCategorySelected}`);
                  return isCategorySelected; 
              });
          }

            if (this.dateRange.start && this.dateRange.end) {
                filtered = filtered.filter(i => {
                    const date = new Date(i.date_created);
                    return date > new Date(this.dateRange.start) &&
                      date < new Date(this.dateRange.end);
                })
            }

            this.filteredProducts = filtered;
        },
        setDateRange(start: string, end: string) {
            this.dateRange = {start, end};
            this.filterProducts();
        },

        setSelectCategories(categories: string[]){
            this.selectedCategories = categories;
            this.filterProducts();
        }
    }
});