import React from 'react'
import { useState, useMemo } from 'react'

export function Filters({ data, filters, onFilterChange }) {
  // 各フィルターの選択肢を data から動的に生成
  var genres = useMemo(function() {
    var set = new Set()
    data.forEach(function(row) { if (row.genre) set.add(row.genre) })
    return Array.from(set).sort()
  }, [data])

  var members = useMemo(function() {
    var set = new Set()
    data.forEach(function(row) { if (row.member) set.add(row.member) })
    return Array.from(set).sort()
  }, [data])

  var musicGenreOptions = useMemo(function() {
    var set = new Set()
    data.forEach(function(row) {
      row.musicGenres.forEach(function(g) { if (g) set.add(g) })
    })
    return Array.from(set).sort()
  }, [data])

  function handleMusicGenreToggle(genre) {
    var current = filters.musicGenres
    var next = current.includes(genre)
      ? current.filter(function(g) { return g !== genre })
      : current.concat(genre)
    onFilterChange('musicGenres', next)
  }

  return (
    React.createElement('div', { className: 'bg-white rounded-lg border border-gray-200 p-4 mb-4' },

      React.createElement('div', { className: 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4' },

        // Genre フィルター
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-xs font-medium text-gray-500 mb-1' }, '動画/配信/shorts'),
          React.createElement('select', {
            className: 'w-full border border-gray-300 rounded px-2 py-1 text-sm',
            value: filters.genre,
            onChange: function(e) { onFilterChange('genre', e.target.value) },
          },
            React.createElement('option', { value: '' }, 'すべて'),
            genres.map(function(g) {
              return React.createElement('option', { key: g, value: g }, g)
            })
          )
        ),

        // Member フィルター
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-xs font-medium text-gray-500 mb-1' }, 'メンバー'),
          React.createElement('select', {
            className: 'w-full border border-gray-300 rounded px-2 py-1 text-sm',
            value: filters.member,
            onChange: function(e) { onFilterChange('member', e.target.value) },
          },
            React.createElement('option', { value: '' }, 'すべて'),
            members.map(function(m) {
              return React.createElement('option', { key: m, value: m }, m)
            })
          )
        ),

        // Music 検索
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-xs font-medium text-gray-500 mb-1' }, '楽曲名'),
          React.createElement('input', {
            type: 'text',
            className: 'w-full border border-gray-300 rounded px-2 py-1 text-sm',
            placeholder: '楽曲名を検索...',
            value: filters.music,
            onChange: function(e) { onFilterChange('music', e.target.value) },
          })
        ),

        // Artist 検索
        React.createElement('div', null,
          React.createElement('label', { className: 'block text-xs font-medium text-gray-500 mb-1' }, 'アーティスト'),
          React.createElement('input', {
            type: 'text',
            className: 'w-full border border-gray-300 rounded px-2 py-1 text-sm',
            placeholder: 'アーティスト名を検索...',
            value: filters.artist,
            onChange: function(e) { onFilterChange('artist', e.target.value) },
          })
        ),
      ),

      // MusicGenre フィルター（複数選択）
      React.createElement('div', { className: 'mt-4' },
        React.createElement('label', { className: 'block text-xs font-medium text-gray-500 mb-2' }, '楽曲ジャンル（複数選択可）'),
        React.createElement('div', { className: 'flex flex-wrap gap-2' },
          musicGenreOptions.map(function(genre) {
            var selected = filters.musicGenres.includes(genre)
            return React.createElement('button', {
              key: genre,
              onClick: function() { handleMusicGenreToggle(genre) },
              className: selected
                ? 'px-3 py-1 text-xs rounded-full border bg-blue-600 text-white border-blue-600'
                : 'px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-600 hover:border-blue-400',
            }, genre)
          })
        )
      ),

      // リセットボタン
      React.createElement('div', { className: 'mt-4 flex justify-end' },
        React.createElement('button', {
          className: 'px-3 py-1 text-xs border border-gray-300 rounded text-gray-500 hover:bg-gray-50',
          onClick: function() {
            onFilterChange('genre', '')
            onFilterChange('member', '')
            onFilterChange('music', '')
            onFilterChange('artist', '')
            onFilterChange('musicGenres', [])
          },
        }, 'フィルターをリセット')
      )
    )
  )
}