
export const fullScreen = (idName) => {
  const ref = document.querySelector(idName)
  if (ref.requestFullscreen) {
    ref.requestFullscreen()
  } else if (ref.mozRequestFullScreen) {
    ref.mozRequestFullScreen()
  } else if (ref.webkitRequestFullScreen) {
    ref.webkitRequestFullScreen()
  }
}

export const exitFullscreen = (idName) => {
  const ref = document.querySelector(idName)
  if (ref.exitFullscreen) {
    ref.exitFullscreen()
  } else if (ref.msExitFullscreen) {
    ref.msExitFullscreen()
  } else if (ref.mozCancelFullScreen) {
    ref.mozCancelFullScreen()
  } else if (ref.oRequestFullscreen) {
    ref.oCancelFullScreen()
  } else if (ref.webkitExitFullscreen) {
    ref.webkitExitFullscreen()
  }
}