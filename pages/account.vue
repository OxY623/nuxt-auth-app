<template>
  <div class="w-full min-h-screen flex flex-col gap-6 items-center justify-center bg-fuchsia-300 p-4">
    <header class="flex w-full max-w-screen-xl justify-between items-center mb-6">
      <h1 class="text-3xl font-extrabold text-gray-800">Account Dashboard</h1>
      <div>
        <p>Username : {{userName}}</p>
      </div>
      <MyButton 
        class = "w-1/5 py-1.5 flex gap-1 justify-center align-middle"
        variant="soft"
        icon="i-heroicons-arrow-right-on-rectangle"
        @click="authStore.logout()">Logout</MyButton>
    </header>

    <div class="w-full max-w-screen-xl flex justify-between items-start gap-6 mb-6">
      <UCard class="w-max">
        <template #header>
          <h2 class="text-xl font-semibold text-gray-700 ">Filters</h2>
        </template>
        <div class="flex gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Date Range</label>
            <div class="flex flex-col gap-2">
              <UInput v-model="dateRange.start" type="date" @update:model-value="updateFilters" />
              <UInput v-model="dateRange.end" type="date" @update:model-value="updateFilters" />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600 mb-2">Categories</label>
            <select
              v-model="selectedCategories"
              multiple
              @change="updateFilters"
              class="form-select block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              <option v-for="category in categories" :key="category.value" :value="category.value">
                {{ category.label }}
              </option>
            </select>
          </div>
        </div>
      </UCard>
    </div>

    <div class="w-full max-w-screen-xl">
      <table class="min-w-full table-auto border-collapse">
        <thead>
          <tr class="bg-orange-400">
            <th class="px-4 py-2 border text-left">ID</th>
            <th class="px-4 py-2 border text-left">Name</th>
            <th class="px-4 py-2 border text-left">Category</th>
            <th class="px-4 py-2 border text-left">Price</th>
            <th class="px-4 py-2 border text-left">Status</th>
            <th class="px-4 py-2 border text-left">Created Date</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in productStore.filteredProducts"
            :key="row.id"
            class="bg-amber-50 hover:bg-amber-100 transition-colors"
          >
            <td class="px-4 py-2 border">{{ row.id }}</td>
            <td class="px-4 py-2 border">{{ row.name }}</td>
            <td class="px-4 py-2 border">{{ row.category }}</td>
            <td class="px-4 py-2 border">{{ row.price }}</td>
            <td class="px-4 py-2 border">
              <span
                :class="{
                  'bg-green-500 text-white px-2 py-1 rounded-full': row.status === 'active',
                  'bg-red-400 text-white px-2 py-1 rounded-full': row.status === 'inactive'
                }"
              >
                {{ row.status }}
              </span>
            </td>
            <td class="px-4 py-2 border">{{ row.date_created }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { useProductStore } from '@/stores/products';
import {MyButton} from '../components/UI';


const authStore = useAuthStore();
const productStore = useProductStore();

const currentUserName = async (): Promise<string> => {
  const data = await authStore.getCurrentUser();
  return data ? `${data.name ?? ''} ${data.surname ?? ''}`.trim() : 'Guest';
};

const userName = await currentUserName();


interface ProductRow {
  id: number;
  name: string;
  category: string;
  price: number;
  status: 'active' | 'inactive';
  date_created: string;
}


interface TableColumn<T> {
  id: keyof T;
  label: string;
  sortable?: boolean;
}


const dateRange = ref({ start: '', end: '' });
const selectedCategories = ref<string[]>([]);

const categories = [
  { value: 'Электроника', label: 'Электроника' },
  { value: 'Мебель', label: 'Мебель' },
  { value: 'Аксессуары', label: 'Аксессуары' },
  { value: 'Носимая электроника', label: 'Носимая электроника' },
  { value: 'Аудио', label: 'Аудио' },
  { value: 'Хранение данных', label: 'Хранение данных' }
];


const columns: TableColumn<ProductRow>[] = [
  { id: 'id', label: 'ID' },
  { id: 'name', label: 'Name', sortable: true },
  { id: 'category', label: 'Category', sortable: true },
  { id: 'price', label: 'Price', sortable: true },
  { id: 'status', label: 'Status' },
  { id: 'date_created', label: 'Created Date', sortable: true }
] as const;


const updateFilters = () => {
  //console.log('Selected categories:', selectedCategories.value, dateRange.value.start, dateRange.value.end);
  productStore.setDateRange(dateRange.value.start, dateRange.value.end);
  productStore.setSelectCategories(selectedCategories.value);
};



onMounted(() => {
  productStore.fetchProducts();
});


// watch(() => productStore.products, (newProducts) => {
//   console.log('Updated products:', newProducts);

// });

// watch(() => productStore.filterProducts, (newProducts) => {
//   console.log('Updated filter products:', newProducts);
  
// });

// watch(() => productStore.selectedCategories, (updatedCategories) => {
//   console.log('Updated categories:', updatedCategories);
  
// });
</script>

