// TypeScript声明文件 for x-data-spreadsheet
declare module 'x-data-spreadsheet' {
  interface SpreadsheetOptions {
    mode?: 'edit' | 'read'
    showToolbar?: boolean
    showGrid?: boolean
    showContextmenu?: boolean
    row?: {
      len?: number
      height?: number
    }
    col?: {
      len?: number
      width?: number
      indexWidth?: number
      minWidth?: number
    }
  }

  interface CellData {
    text?: string
    style?: {
      bgcolor?: string
      align?: 'left' | 'center' | 'right'
      font?: {
        bold?: boolean
        size?: number
        color?: string
      }
    }
  }

  interface SheetData {
    name?: string
    rows?: {
      len?: number
    }
    cols?: {
      len?: number
    }
    cells?: {
      [key: string]: CellData
    }
  }

  class Spreadsheet {
    constructor(container: HTMLElement | string, options?: SpreadsheetOptions)
    loadData(data: SheetData[]): Spreadsheet
    change(callback: (data: any) => void): Spreadsheet
    getData(): SheetData[]
    static locale(lang: string, localeData?: any): void
  }

  export { Spreadsheet }
}

// 中文语言包模块声明
declare module 'x-data-spreadsheet/dist/locale/zh-cn' {
  const zhCN: any
  export = zhCN
}