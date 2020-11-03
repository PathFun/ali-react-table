import { TableTransform } from '../interfaces'
import { buildTree as _buildTree } from '../utils'

/** @deprecated 所有的 transform 都已经过时，请使用最新的 pipeline 来对表格进行拓展 */
export function makeBuildTreeTransform(idProp: string, parentIdProp: string): TableTransform {
  return ({ columns, dataSource }) => {
    return { columns, dataSource: _buildTree(idProp, parentIdProp, dataSource) }
  }
}
