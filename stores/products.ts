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
            this.products = [
                {
                  "id": 1,
                  "name": "Ноутбук Эльбрус-8С",
                  "category": "Электроника",
                  "price": 159999.99,
                  "status": "active",
                  "date_created": "2025-03-01",
                  "description": "Ноутбук на отечественном процессоре Эльбрус-8С"
                },
                {
                  "id": 2,
                  "name": "Смартфон AYYA T1",
                  "category": "Электроника",
                  "price": 16999.99,
                  "status": "active",
                  "date_created": "2025-02-20",
                  "description": "Отечественный смартфон с ОС Android"
                },
                {
                  "id": 3,
                  "name": "Монитор Rikor",
                  "category": "Электроника",
                  "price": 34999.99,
                  "status": "inactive",
                  "date_created": "2025-01-15",
                  "description": "Монитор с российской сборкой и высоким качеством изображения"
                },
                {
                  "id": 4,
                  "name": "Клавиатура OKLICK 920G IRON EDGE",
                  "category": "Аксессуары",
                  "price": 2999.99,
                  "status": "active",
                  "date_created": "2025-03-10",
                  "description": "Игровая механическая клавиатура с RGB-подсветкой"
                },
                {
                  "id": 5,
                  "name": "Наушники SVEN AP-G888MV",
                  "category": "Аудио",
                  "price": 3999.99,
                  "status": "active",
                  "date_created": "2025-02-28",
                  "description": "Игровая гарнитура с микрофоном"
                },
                {
                  "id": 6,
                  "name": "Флеш-накопитель SmartBuy 128GB",
                  "category": "Хранение данных",
                  "price": 1299.99,
                  "status": "active",
                  "date_created": "2025-03-12",
                  "description": "USB 3.0 флешка для хранения данных"
                },
                {
                  "id": 7,
                  "name": "Смарт-часы Gelius Pro",
                  "category": "Носимая электроника",
                  "price": 5999.99,
                  "status": "inactive",
                  "date_created": "2025-02-18",
                  "description": "Умные часы с отслеживанием активности"
                },
                {
                  "id": 8,
                  "name": "Геймпад Defender Game Racer X7",
                  "category": "Аксессуары",
                  "price": 2499.99,
                  "status": "active",
                  "date_created": "2025-03-08",
                  "description": "Геймпад с поддержкой ПК и консолей"
                },
                {
                  "id": 9,
                  "name": "Кресло компьютерное TetChair iCar",
                  "category": "Мебель",
                  "price": 18999.99,
                  "status": "inactive",
                  "date_created": "2025-02-25",
                  "description": "Эргономичное кресло для работы и игр"
                },
                {
                  "id": 10,
                  "name": "ИБП IPPON Back Power Pro",
                  "category": "Электроника",
                  "price": 8999.99,
                  "status": "active",
                  "date_created": "2025-03-05",
                  "description": "Источник бесперебойного питания для дома и офиса"
                }
              ];
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