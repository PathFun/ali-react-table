import { TableTransform } from '../interfaces'
import { traverseColumn } from '../utils'

/** @deprecated 所有的 transform 都已经过时，请使用最新的 pipeline 来对表格进行拓展 */
export function makeOrderFieldTransform(startOrder = 1): TableTransform {
  return traverseColumn((column) => {
    if (column.features?.order || column.features?.orderField) {
      return {
        ...column,
        getValue(record: any, index: number): any {
          return index + startOrder
        },
      }
    }
    return column
  })
}
