import React, { useState } from 'react'
import { TableTransform } from '../interfaces'
import { isLeafNode, mergeCellProps, traverseColumn } from '../utils'

/** @deprecated 所有的 transform 都已经过时，请使用最新的 pipeline 来对表格进行拓展 */
export interface ColumnHoverOptions {
  hoverColor?: string
  hoverColIndex: number
  onChangeHoverColIndex(nextColIndex: number): void
}

/** @deprecated 所有的 transform 都已经过时，请使用最新的 pipeline 来对表格进行拓展 */
export function makeColumnHoverTransform({
  hoverColor = 'var(--hover-bgcolor)',
  hoverColIndex,
  onChangeHoverColIndex,
}: ColumnHoverOptions): TableTransform {
  return traverseColumn((col, { range }) => {
    if (!isLeafNode(col)) {
      return col
    }

    const colIndexMatched = range.start <= hoverColIndex && hoverColIndex < range.end

    const prevGetCellProps = col.getCellProps

    return {
      ...col,
      getCellProps(value: any, record: any, rowIndex: number) {
        const prevCellProps = prevGetCellProps?.(value, record, rowIndex)

        return mergeCellProps(prevCellProps, {
          style: { '--bgcolor': colIndexMatched ? hoverColor : undefined } as any,
          onMouseEnter() {
            onChangeHoverColIndex(range.start)
          },
          onMouseLeave() {
            onChangeHoverColIndex(-1)
          },
        })
      },
    }
  })
}

/** @deprecated 所有的 transform 都已经过时，请使用最新的 pipeline 来对表格进行拓展 */
export function useColumnHoverTransform({
  hoverColor,
  defaultHoverColIndex = -1,
}: { hoverColor?: string; defaultHoverColIndex?: number } = {}) {
  const [hoverColIndex, onChangeHoverColIndex] = useState(defaultHoverColIndex)
  return makeColumnHoverTransform({ hoverColor, hoverColIndex, onChangeHoverColIndex })
}
