function Expire({ delay, children }) {
  const { useState, useEffect } = wp.element
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setVisible(false)
    }, delay)
  }, [delay])

  return visible ? <>{children}</> : null
}

export default Expire
