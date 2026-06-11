import React from 'react'

export default function CustomCursor({ mouseCoords }) {
  return (
    <div className="hidden lg:block">
      <div
        className="custom-cursor"
        style={{ transform: `translate3d(${mouseCoords.x}px, ${mouseCoords.y}px, 0)` }}
      />
      <div
        className="custom-cursor-follower"
        style={{
          transform: `translate3d(${mouseCoords.x}px, ${mouseCoords.y}px, 0)`,
          transition: 'transform 0.1s cubic-bezier(0.25, 1, 0.5, 1), width 0.3s, height 0.3s, background-color 0.3s, border-color 0.3s'
        }}
      />
    </div>
  )
}
