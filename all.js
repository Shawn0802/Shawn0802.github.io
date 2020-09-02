/* global Vue */
/* eslint-disable no-new */
import pagination from './pagination.js';//匯入元件
import modal from './modal.js';//匯入元件

Vue.component('pagination', pagination);//全域註冊
Vue.component('modal', modal);//全域註冊

new Vue({
  el: '#app',
  data: {
    products: [],
    pagination: {},
    tempProduct: {
      imageUrl: []
    },
    api: {
      uuid: '74dfdd02-bd64-495e-963c-25429417612d',
      path: 'https://course-ec-api.hexschool.io/api/',
    },
    token: '',
    isNew: '',
    loadingBtn: '',
  },
  methods: {
    updateProduct() {},
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = { imageUrl: [] };
          $('#productModal').modal('show');
          break;
        case 'edit':
          this.loadingBtn = item.id;
          const url = `${this.api.path}${this.api.uuid}/admin/ec/product/${item.id}`;//取得單一商品資料 編輯step.1
          axios.get(url)
          .then((res) => {
            console.log(res)
            this.tempProduct = res.data.data;
            $('#productModal').modal('show');
            this.loadingBtn = ''; //ajax結束後清除
          });
          break;
        case 'delete':
          $('#delProductModal').modal('show');
          this.tempProduct = Object.assign({}, item);
          break;
        default:
          break;
      }
    },
    delProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) {
            this.products.splice(i, 1);
            this.tempProduct = {};
          }
        });
      }
      $('#delProductModal').modal('hide');
    },
    getProducts(num = 1){  //讓num在頁面上不為undefined
      console.log(num);
      const url = `${this.api.path}${this.api.uuid}/admin/ec/products?page=${num}`;//將值帶入num,讓頁面更動
      axios.get(url)
      .then((res) => {
        console.log(res);
        this.products = res.data.data;//獲得頁面資料
        this.pagination = res.data.meta.pagination;//獲得分頁資訊

        if (this.tempProduct.id) {//如果id存在的話,就關掉視窗 編輯step.3
          this.tempProduct = {
            imageUrl: [],
          };
          $('#productModal').modal('hide');
        }
      });
    },
  },
  created() {
    this.token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, //把token帶出來
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
    this.getProducts();  //將token發送以做驗證
  },
});
