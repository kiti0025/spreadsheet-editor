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
.spreadsheet-container {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}

.spreadsheet-main {
  width: 100%;
  height: 100%;
  position: relative;
}

/* x-spreadsheet中文样式优化 */
:deep(.x-spreadsheet) {
  font-family: 'Microsoft YaHei', 'PingFang SC', Arial, sans-serif !important;
  width: 100% !important;
  height: 100% !important;
}

/* 工具栏样式 */
:deep(.x-spreadsheet-toolbar) {
  background-color: #f8f9fa !important;
  border-bottom: 1px solid #dee2e6 !important;
  font-family: 'Microsoft YaHei', Arial, sans-serif !important;
}

/* 工具栏按钮样式 */
:deep(.x-spreadsheet-toolbar .x-spreadsheet-toolbar-btn) {
  font-family: 'Microsoft YaHei', Arial, sans-serif !important;
  color: #495057 !important;
}

/* 右键菜单样式 */
:deep(.x-spreadsheet-contextmenu) {
  font-family: 'Microsoft YaHei', Arial, sans-serif !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
  border-radius: 6px !important;
}

/* 单元格样式 */
:deep(.x-spreadsheet-cell) {
  font-family: 'Microsoft YaHei', Arial, sans-serif !important;
}

/* 合并单元格样式 */
:deep(.x-spreadsheet-cell.merge) {
  border: 2px solid #007acc !important;
  background-color: rgba(0, 122, 204, 0.1) !important;
}

/* 选中状态样式 */
:deep(.x-spreadsheet-cell.selected) {
  border: 2px solid #007acc !important;
  background-color: rgba(0, 122, 204, 0.2) !important;
}

/* 滚动条样式优化 */
:deep(.x-spreadsheet-scrollbar) {
  background-color: #f8f9fa !important;
}

:deep(.x-spreadsheet-scrollbar-thumb) {
  background-color: #adb5bd !important;
  border-radius: 4px !important;
}

:deep(.x-spreadsheet-scrollbar-thumb:hover) {
  background-color: #6c757d !important;
}
</style>
