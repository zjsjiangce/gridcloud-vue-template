import { Debounce } from '../../utils'

export default (Vue) => {
  Vue.directive('venus-resize', {
    inserted: function (el, { value: cb }) {
      const wrapper = el
      const objDom = document.createElement('object')
      const _handleObjectLoad = () => {
        objDom.contentDocument.defaultView.addEventListener('resize', Debounce(() => {
          const { width, height } = wrapper.getBoundingClientRect()
          cb && cb([width, height])
        }))
        const { width, height } = wrapper.getBoundingClientRect()
        cb && cb([width, height])
      }
      objDom.style.cssText = `
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
        opacity: 0;
        pointer-events: none;
        z-index: -1;
      `
      objDom.onload = _handleObjectLoad

      objDom.type = 'text/html'
      objDom.data = 'about:blank'
      wrapper.appendChild(objDom)
    },
  })
}
