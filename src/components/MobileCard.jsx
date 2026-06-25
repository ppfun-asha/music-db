import React from 'react'

function MobileCard(props) {
  var row = props.row

function handleClick() {
  if (row.playUrl) {
    var confirmed = window.confirm('YouTubeを開きますか？')
    if (confirmed) window.open(row.playUrl, '_blank', 'noopener,noreferrer')
  }
}

  return (
    React.createElement('div', {
      onClick: handleClick,
      className: 'bg-white rounded-lg border border-gray-200 p-4 cursor-pointer active:bg-blue-50',
    },
      // 上段：日付・Member
      React.createElement('div', { className: 'flex items-center justify-between mb-2' },
        React.createElement('span', { className: 'text-xs text-gray-400' }, row.date),
        React.createElement('span', { className: 'text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full' }, row.member)
      ),
      // 中段：楽曲名・アーティスト名
      React.createElement('div', { className: 'mb-2' },
        React.createElement('div', { className: 'text-sm font-medium text-gray-800' }, row.music),
        React.createElement('div', { className: 'text-xs text-gray-400 mt-0.5' }, row.artist)
      ),
      // 下段：コンテンツ名
      React.createElement('div', { className: 'border-t border-gray-100 pt-2' },
        React.createElement('div', { className: 'text-xs text-gray-500' }, row.title)
      )
    )
  )
}

export { MobileCard }