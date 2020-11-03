import { TableTransform } from '../interfaces'
import { isLeafNode, traverseColumn } from '../utils'

/** @deprecated 所有的 transform 都已经过时，请使用最新的 pipeline 来对表格进行拓展 */
export function makeFlattenTransform(): TableTransform {
  return traverseColumn((column) => {
    if (isLeafNode(column)) {
      return column
    }
    return column.features?.flatten ? column.children : column
  })
}
