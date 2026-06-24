import React from 'react'
import { useState } from 'react'
import { MobileCard } from './MobileCard'

function MobileView(props) {
  var data = props.data
  var filters = props.filters
  var onFilterChange = props.onFilterChange
  var allData = props.allData

  var drawerState = useState(false)
  var drawerOpen = drawerState[0]
  var setDrawerOpen = drawerState[1]

  var paginationState = useState(20)
  var displayCount = paginationState[0]
  var setDisplayCount = paginationState[1]

  var genres = React.useMemo(function() {
    var set = new Set()
    allData.forEach(function(row) { if (row.genre) set.add(row.genre) })
    return Array.from(set).sort()
  }, [allData])

  var members = React.useMemo(function() {
    var set = new Set()
    allData.forEach(function(row) { if (row.member) set.add(row.member) })
    return Array.from(set).sort()
  }, [allData])

  var musicGenreOptions = React.useMemo(function() {
    var set = new Set()
    allData.forEach(function(row) {
      row.musicGenres.forEach(function(g) { if (g) set.add(g) })
    })
    return Array.from(set).sort()
  }, [allData])

  function handleMusicGenreToggle(genre) {
    var current = filters.musicGenres
    var next = current.includes(genre)
      ? current.filter(function(g) { return g !== genre })
      : current.concat(genre)
    onFilterChange('musicGenres', next)
  }

  function handleReset() {
    onFilterChange('genre', '')
    onFilterChange('member', '')
    onFilterChange('music', '')
    onFilterChange('artist', '')
    onFilterChange('musicGenres', [])
  }

  var visibleData = data.slice(0, displayCount)

  return (
    React.createElement('div', { className: 'relative' },

      drawerOpen && React.createElement('div', {
        className: 'fixed inset-0 bg-black bg-opacity-40 z-40',
        onClick: function() { setDrawerOpen(false) },
      }),

      React.createElement('div', {
        className: 'fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl overflow-y-auto',
        style: { transform: drawerOpen ? 'translateX(0)' : 'translateX(-100%)', transition: 'transform 0.3s ease' },
      },
        React.createElement('div', { className: 'p-4' },
          React.createElement('div', { className: 'flex items-center justify-between mb-4' },
            React.createElement('span', { className: 'font-medium text-gray-800' }, 'フィルター'),
            React.createElement('button', {
              onClick: function() { setDrawerOpen(false) },
              className: 'text-gray-400 text-xl',
            }, '✕')
          ),

          React.createElement('div', { className: 'mb-4' },
            React.createElement('label', { className: 'block text-xs font-medium text-gray-500 mb-1' }, '動画/配信/shorts'),
            React.createElement('select', {
              className: 'w-full border border-gray-300 rounded px-2 py-2 text-sm',
              value: filters.genre,
              onChange: function(e) { onFilterChange('genre', e.target.value) },
            },
              React.createElement('option', { value: '' }, 'すべて'),
              genres.map(function(g) {
                return React.createElement('option', { key: g, value: g }, g)
              })
            )
          ),

          React.createElement('div', { className: 'mb-4' },
            React.createElement('label', { className: 'block text-xs font-medium text-gray-500 mb-1' }, 'メンバー'),
            React.createElement('select', {
              className: 'w-full border border-gray-300 rounded px-2 py-2 text-sm',
              value: filters.member,
              onChange: function(e) { onFilterChange('member', e.target.value) },
            },
              React.createElement('option', { value: '' }, 'すべて'),
              members.map(function(m) {
                return React.createElement('option', { key: m, value: m }, m)
              })
            )
          ),

          React.createElement('div', { className: 'mb-4' },
            React.createElement('label', { className: 'block text-xs font-medium text-gray-500 mb-1' }, '楽曲名'),
            React.createElement('input', {
              type: 'text',
              className: 'w-full border border-gray-300 rounded px-2 py-2 text-sm',
              placeholder: '楽曲名を検索...',
              value: filters.music,
              onChange: function(e) { onFilterChange('music', e.target.value) },
            })
          ),

          React.createElement('div', { className: 'mb-4' },
            React.createElement('label', { className: 'block text-xs font-medium text-gray-500 mb-1' }, 'アーティスト'),
            React.createElement('input', {
              type: 'text',
              className: 'w-full border border-gray-300 rounded px-2 py-2 text-sm',
              placeholder: 'アーティスト名を検索...',
              value: filters.artist,
              onChange: function(e) { onFilterChange('artist', e.target.value) },
            })
          ),

          React.createElement('div', { className: 'mb-4' },
            React.createElement('label', { className: 'block text-xs font-medium text-gray-500 mb-2' }, '楽曲ジャンル'),
            React.createElement('div', { className: 'flex flex-wrap gap-2' },
              musicGenreOptions.map(function(genre) {
                var selected = filters.musicGenres.includes(genre)
                return React.createElement('button', {
                  key: genre,
                  onClick: function() { handleMusicGenreToggle(genre) },
                  className: selected
                    ? 'px-3 py-1 text-xs rounded-full bg-blue-600 text-white'
                    : 'px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-600',
                }, genre)
              })
            )
          ),

          React.createElement('div', { className: 'flex gap-2 mt-6' },
            React.createElement('button', {
              onClick: handleReset,
              className: 'flex-1 py-2 text-sm border border-gray-300 rounded text-gray-500',
            }, 'リセット'),
            React.createElement('button', {
              onClick: function() { setDrawerOpen(false) },
              className: 'flex-1 py-2 text-sm bg-blue-600 text-white rounded',
            }, '適用')
          )
        )
      ),

      React.createElement('div', { className: 'text-xs text-gray-400 mb-3' },
        '全 ' + data.length.toLocaleString() + ' 件'
      ),

      React.createElement('div', { className: 'flex flex-col gap-3' },
        visibleData.map(function(row) {
          return React.createElement(MobileCard, { key: row.no, row: row })
        })
      ),

      displayCount < data.length && React.createElement('button', {
        onClick: function() { setDisplayCount(function(c) { return c + 20 }) },
        className: 'w-full mt-4 py-3 text-sm text-blue-600 border border-blue-300 rounded-lg',
      }, 'もっと見る（残り ' + (data.length - displayCount).toLocaleString() + ' 件）'),

      React.createElement('button', {
        onClick: function() { setDrawerOpen(true) },
        className: 'fixed bottom-6 right-6 bg-blue-600 text-white rounded-full px-5 py-3 shadow-lg text-sm font-medium z-30',
      }, 'フィルター')
    )
  )
}

export { MobileView }