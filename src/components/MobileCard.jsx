import React from 'react'
import { useState } from 'react'

function MobileCard(props) {
  var row = props.row
  var dialogState = useState(false)
  var showDialog = dialogState[0]
  var setShowDialog = dialogState[1]

  function handleClick() {
    if (row.playUrl) setShowDialog(true)
  }

  function handleConfirm() {
    setShowDialog(false)
    window.open(row.playUrl, '_blank', 'noopener,noreferrer')
  }

  function handleCancel() {
    setShowDialog(false)
  }

  return (
    React.createElement('div', { style: { position: 'relative' } },

      // カード本体
      React.createElement('div', {
        onClick: handleClick,
        className: 'bg-white rounded-lg border border-gray-200 p-4 cursor-pointer active:bg-blue-50',
      },
        React.createElement('div', { className: 'flex items-center justify-between mb-2' },
          React.createElement('span', { className: 'text-xs text-gray-400' }, row.date),
          React.createElement('span', { className: 'text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full' }, row.member)
        ),
        React.createElement('div', { className: 'mb-2' },
          React.createElement('div', { className: 'text-sm font-medium text-gray-800' }, row.music),
          React.createElement('div', { className: 'text-xs text-gray-400 mt-0.5' }, row.artist)
        ),
        React.createElement('div', { className: 'border-t border-gray-100 pt-2' },
          React.createElement('div', { className: 'text-xs text-gray-500' }, row.title)
        )
      ),

      // カスタムダイアログ
      showDialog && React.createElement('div', {
        style: {
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem',
        }
      },
        React.createElement('div', {
          style: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            width: '100%',
            maxWidth: '320px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
          }
        },
          React.createElement('p', {
            style: { fontWeight: '600', fontSize: '1rem', marginBottom: '0.5rem', color: '#1f2937' }
          }, 'YouTubeを開きますか？'),
          React.createElement('p', {
            style: { fontSize: '0.75rem', color: '#6b7280', marginBottom: '1.25rem' }
          }, row.music + ' / ' + row.artist),
          React.createElement('div', { style: { display: 'flex', gap: '0.75rem' } },
            React.createElement('button', {
              onClick: handleCancel,
              style: {
                flex: 1,
                padding: '0.6rem',
                borderRadius: '0.5rem',
                border: '1px solid #d1d5db',
                backgroundColor: 'white',
                color: '#6b7280',
                fontSize: '0.875rem',
                cursor: 'pointer',
              }
            }, 'キャンセル'),
            React.createElement('button', {
              onClick: handleConfirm,
              style: {
                flex: 1,
                padding: '0.6rem',
                borderRadius: '0.5rem',
                border: 'none',
                backgroundColor: '#2563eb',
                color: 'white',
                fontSize: '0.875rem',
                fontWeight: '600',
                cursor: 'pointer',
              }
            }, '開く')
          )
        )
      )
    )
  )
}

export { MobileCard }