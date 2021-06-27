import React from "react"

export const useMessage = () => {
  return React.useCallback((text) => {
    if (text) {
      alert(text)

    }
  }, [])
}