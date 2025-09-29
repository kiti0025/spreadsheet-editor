<template>
  <div class="spreadsheet-container">
    <div 
      id="x-spreadsheet" 
      ref="spreadsheetRef"
      class="spreadsheet-main"
    ></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

// 引入x-data-spreadsheet
import Spreadsheet from 'x-data-spreadsheet'
// 引入中文本地化语言包
import 'x-data-spreadsheet/dist/locale/zh-cn'

const spreadsheetRef = ref(null)
let spreadsheetInstance = null

// 初始化表格
const initSpreadsheet = () => {
  if (!spreadsheetRef.value) return
  
  try {
    // 销毁之前的实例
    if (spreadsheetInstance) {
      spreadsheetInstance = null
    }
    // 设置中文本地化
    Spreadsheet.locale('zh-cn')   
    // 创建新实例，使用中文配置
    spreadsheetInstance = new Spreadsheet(spreadsheetRef.value, {
      mode: 'edit',
      showToolbar: true,
      showGrid: true,
      showContextmenu: true,
      row: {
        len: 100,
        height: 25
      },
      col: {
        len: 26,
        width: 100,
        indexWidth: 60,
        minWidth: 60
      }
    })
      .change((data) => {
        console.log('表格数据变化:', data)
      })
    
    console.log('中文电子表格编辑器初始化成功')
  } catch (e) {
    console.error('初始化表格失败:', e)
  }
}

onMounted(() => {
  nextTick(() => {
    initSpreadsheet()
  })
})

onBeforeUnmount(() => {
  if (spreadsheetInstance) {
    spreadsheetInstance = null
  }
})
</script>

<style scoped>
</style>
