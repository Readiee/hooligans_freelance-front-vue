export default {
  mounted (el, binding) {
    const options = {
      root: document.querySelector('#scrollArea'),
      rootMargin: '0px',
      threshold: 1.0
    }

    const callback = (entires, observer) => {
      if (entires[0].isIntersecting) {
        binding.value()
      }
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(el)
  },
  name: 'intersection'
}
