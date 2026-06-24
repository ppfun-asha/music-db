import React from 'react'
import { useState, useMemo } from 'react'
import { useData } from './hooks/useData'
import { DataTable } from './components/DataTable'
import { Filters } from './components/Filters'
import { MobileView } from './components/MobileView'

var memberColors = [
  '#FFF3E0', // 暁月クララ：オレンジ
  '#E3F4FC', // 七海ロナ：ブルー
  '#FFF0F3', // 藤宮コトハ：ライトピンク
  '#E8F5E9', // 常磐カナメ：グリーン
  '#FDECEA', // 江波キョウカ：レッド
  '#F3EEF8', // 鬼多見アユム：ヴァイオレット
  '#EAF6FB', // 香鳴ハノン：パステルブルー
  '#E8FAF6', // 夏渚まはろ：パールアクア
]

var bgColor = memberColors[Math.floor(Math.random() * memberColors.length)]

var initialFilters = {
  genre: '',
  member: '',
  music: '',
  artist: '',
  musicGenres: [],
}

function useIsMobile() {
  var state = useState(window.innerWidth < 768)
  var isMobile = state[0]
  var setIsMobile = state[1]
  React.useEffect(function() {
    function handleResize() { setIsMobile(window.innerWidth < 768) }
    window.addEventListener('resize', handleResize)
    return function() { window.removeEventListener('resize', handleResize) }
  }, [])
  return isMobile
}

function App() {
  var dataResult = useData()
  var data = dataResult.data
  var loading = dataResult.loading
  var error = dataResult.error

  var filtersState = useState(initialFilters)
  var filters = filtersState[0]
  var setFilters = filtersState[1]

  var isMobile = useIsMobile()

  function handleFilterChange(key, value) {
    setFilters(function(prev) {
      var next = Object.assign({}, prev)
      next[key] = value
      return next
    })
  }

var filteredData = useMemo(function() {
  var filtered = data.filter(function(row) {
    if (filters.genre && row.genre !== filters.genre) return false
    if (filters.member && row.member !== filters.member) return false
    if (filters.music && row.music.indexOf(filters.music) === -1) return false
    if (filters.artist && row.artist.indexOf(filters.artist) === -1) return false
    if (filters.musicGenres.length > 0) {
      var hasGenre = filters.musicGenres.every(function(g) {
        return row.musicGenres.includes(g)
      })
      if (!hasGenre) return false
    }
    return true
  })
  return filtered.sort(function(a, b) { return b.no - a.no })
}, [data, filters])

  if (loading) return (
    React.createElement('div', { className: 'min-h-screen flex items-center justify-center text-gray-500' },
      'データを読み込み中...'
    )
  )

  if (error) return (
    React.createElement('div', { className: 'min-h-screen flex items-center justify-center text-red-500' },
      'エラー：' + error
    )
  )

  if (isMobile) return (
    React.createElement('div', { className: 'min-h-screen p-4', style: { backgroundColor: bgColor } },
      React.createElement('h1', { className: 'text-xl font-bold text-gray-800 mb-4' }, 'Palette Project 歌枠データベース'),
      React.createElement(MobileView, {
        data: filteredData,
        filters: filters,
        onFilterChange: handleFilterChange,
        allData: data,
      })
    )
  )

  return (
    React.createElement('div', { className: 'min-h-screen p-4', style: { backgroundColor: bgColor } },
      React.createElement('h1', { className: 'text-2xl font-bold text-gray-800 mb-4' }, 'Palette Project 歌枠データベース'),
      React.createElement(Filters, {
        data: data,
        filters: filters,
        onFilterChange: handleFilterChange,
      }),
      React.createElement(DataTable, { data: filteredData })
    )
  )
}

export default App