import React from 'react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import { useState } from 'react'

const columns = [
  { accessorKey: 'no',          header: 'No',         size: 60  },
  { accessorKey: 'genre',       header: 'Genre',       size: 80  },
  { accessorKey: 'date',        header: '日付',         size: 100 },
  { accessorKey: 'member',      header: 'Member',      size: 100 },
  { accessorKey: 'title',       header: 'Title',       size: 200 },
  { accessorKey: 'music',       header: '楽曲名',       size: 150 },
  { accessorKey: 'artist',      header: 'アーティスト', size: 150 },
  {
    accessorKey: 'musicGenres',
    header: 'ジャンル',
    size: 120,
    enableSorting: false,
    cell: function MusicGenresCell(info) {
      return info.getValue().join(', ')
    },
  },
]

export function DataTable({ data }) {
  var sortingState = useState([])
  var sorting = sortingState[0]
  var setSorting = sortingState[1]

  var paginationState = useState({ pageIndex: 0, pageSize: 25 })
  var pagination = paginationState[0]
  var setPagination = paginationState[1]

  var table = useReactTable({
    data: data,
    columns: columns,
    state: { sorting: sorting, pagination: pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  var headerGroups = table.getHeaderGroups()
  var rows = table.getRowModel().rows

  function handleRowClick(url) {
    if (url) window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    React.createElement('div', null,
      React.createElement('div', { className: 'overflow-x-auto rounded-lg border border-gray-200' },
        React.createElement('table', { className: 'min-w-full text-sm text-gray-700' },
          React.createElement('thead', { className: 'bg-gray-100 text-xs uppercase text-gray-500' },
            headerGroups.map(function(headerGroup) {
              return React.createElement('tr', { key: headerGroup.id },
                headerGroup.headers.map(function(header) {
                  var sorted = header.column.getIsSorted()
                  var label = flexRender(header.column.columnDef.header, header.getContext())
                  var arrow = sorted === 'asc' ? ' ▲' : sorted === 'desc' ? ' ▼' : ''
                  return React.createElement('th', {
                    key: header.id,
                    className: 'px-3 py-2 text-left whitespace-nowrap cursor-pointer select-none hover:bg-gray-200',
                    style: { width: header.column.columnDef.size },
                    onClick: header.column.getToggleSortingHandler(),
                  }, label, arrow)
                })
              )
            })
          ),
          React.createElement('tbody', null,
            rows.map(function(row, i) {
              var url = row.original.playUrl
              return React.createElement('tr', {
                key: row.id,
                className: (i % 2 === 0 ? 'bg-white' : 'bg-gray-50') + ' cursor-pointer hover:bg-blue-50',
                onClick: function() { handleRowClick(url) },
              },
                row.getVisibleCells().map(function(cell) {
                  return React.createElement('td', {
                    key: cell.id,
                    className: 'px-3 py-2 whitespace-nowrap',
                  }, flexRender(cell.column.columnDef.cell, cell.getContext()))
                })
              )
            })
          )
        )
      ),
      React.createElement('div', { className: 'mt-3 flex items-center justify-between text-sm text-gray-600' },
        React.createElement('div', { className: 'flex items-center gap-2' },
          React.createElement('span', null, '1ページあたり'),
          React.createElement('select', {
            className: 'border border-gray-300 rounded px-2 py-1',
            value: pagination.pageSize,
            onChange: function(e) {
              setPagination(function(p) { return { pageIndex: 0, pageSize: Number(e.target.value) } })
            },
          },
            [10, 25, 50, 100].map(function(size) {
              return React.createElement('option', { key: size, value: size }, size + '件')
            })
          )
        ),
        React.createElement('div', { className: 'flex items-center gap-2' },
          React.createElement('button', {
            className: 'px-2 py-1 border rounded disabled:opacity-40',
            onClick: function() { table.firstPage() },
            disabled: !table.getCanPreviousPage(),
          }, '«'),
          React.createElement('button', {
            className: 'px-2 py-1 border rounded disabled:opacity-40',
            onClick: function() { table.previousPage() },
            disabled: !table.getCanPreviousPage(),
          }, '‹'),
          React.createElement('span', null, (pagination.pageIndex + 1) + ' / ' + table.getPageCount() + ' ページ'),
          React.createElement('button', {
            className: 'px-2 py-1 border rounded disabled:opacity-40',
            onClick: function() { table.nextPage() },
            disabled: !table.getCanNextPage(),
          }, '›'),
          React.createElement('button', {
            className: 'px-2 py-1 border rounded disabled:opacity-40',
            onClick: function() { table.lastPage() },
            disabled: !table.getCanNextPage(),
          }, '»')
        ),
        React.createElement('div', null, '全 ' + data.length.toLocaleString() + ' 件')
      )
    )
  )
}