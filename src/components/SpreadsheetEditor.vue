<template>
  <div class="spreadsheet-container">
    <div 
      id="x-spreadsheet" 
      ref="spreadsheetRef"
      class="spreadsheet-main"
    ></div>
  </div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'

// 引入x-data-spreadsheet
import Spreadsheet from 'x-data-spreadsheet'
// 引入中文本地化语言包
import 'x-data-spreadsheet/dist/locale/zh-cn'

export default {
  name: 'SpreadsheetEditor',
  setup() {
    const spreadsheetRef = ref(null)
    let spreadsheetInstance = null

    // 初始化中文示例数据
    const initChineseData = () => {
      return {
        name: '工作表1',
        rows: {
          len: 100
        },
        cols: {
          len: 26
        },
        cells: {
          A1: { 
            text: '欢迎使用中文电子表格编辑器', 
            style: { 
              bgcolor: '#e3f2fd', 
              align: 'center', 
              font: { bold: true, size: 14 } 
            } 
          },
          B1: { text: '姓名', style: { bgcolor: '#f5f5f5', font: { bold: true } } },
          C1: { text: '年龄', style: { bgcolor: '#f5f5f5', font: { bold: true } } },
          D1: { text: '职位', style: { bgcolor: '#f5f5f5', font: { bold: true } } },
          E1: { text: '薪资', style: { bgcolor: '#f5f5f5', font: { bold: true } } },
          B2: { text: '张三' },
          C2: { text: '28' },
          D2: { text: '前端工程师' },
          E2: { text: '15000' },
          B3: { text: '李四' },
          C3: { text: '32' },
          D3: { text: '后端工程师' },
          E3: { text: '18000' },
          B4: { text: '王五' },
          C4: { text: '25' },
          D4: { text: '设计师' },
          E4: { text: '12000' },
          A6: { 
            text: '功能说明：', 
            style: { font: { bold: true, color: '#1976d2' } } 
          },
          A7: { text: '• 支持单元格合并与拆分' },
          A8: { text: '• 支持丰富的格式设置' },
          A9: { text: '• 支持公式计算' },
          A10: { text: '• 支持数据导入导出' },
          A11: { text: '• 完全中文界面' }
        }
      }
    }

    // 初始化表格
    const initSpreadsheet = () => {
      if (!spreadsheetRef.value) return

      const data = initChineseData()
      
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
          .loadData([data])
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

    return {
      spreadsheetRef
    }
  }
}
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