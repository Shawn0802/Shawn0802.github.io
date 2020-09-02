export default { //匯出至all.js外層
  template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item"><a class="page-link" href="#">Previous</a></li>

      <li class="page-item" v-for="i in pages.total_pages" :key="i" :class="{ active: pages.current_page === i }" >  
        <a class="page-link" href="#"
          @click.prevent="updatePage(i)">{{ i }} 
        </a>
      </li>

      <li class="page-item"><a class="page-link" href="#">Next</a></li>
    </ul>
  </nav>`,//v-for渲染頁面多筆資料至li,設立＠監聽頁面按鈕,目前在哪一頁,就啟用視覺狀態
  props: ['pages'],//使用props讓元件有資料且，由外而內
  methods: {
    updatePage(num) { //接收到分頁的值
      this.$emit('update', num); //觸發外層事件，使頁面更動,由內而外
    },
  },
};

//Q1 :為何在modal元件裡要定義資料結構,在pagination裡面不用？
//Q2 :不知道為什麼不知道為什麼無法建立新商品,一直跳出422的反饋
//Q3 :在第四週作業詳解影片1:28:35,老師在temproduct塞入{ imageUrl: [] } 跟all.js 第75行為什麼也要塞入imageurl:[]想知道為什麼這麼做