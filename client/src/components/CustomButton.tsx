import { CSSProperties, FC } from 'react'
import { useSnapshot } from 'valtio'

import state from '../store'
import { getContrastingColor } from '../config/helpers'

type ButtonType = 'filled' | 'outlined'

type CustomButtonProps = {
  type: ButtonType
  title: string
  customStyles?: string
  disabled?: boolean
  onClick?: () => void
}

const CustomButton: FC<CustomButtonProps> = ({
  type,
  title,
  customStyles,
  disabled,
  onClick,
}) => {
  const snap = useSnapshot(state)
  const generateStyle = (type: ButtonType): CSSProperties | undefined => {
    let disabledStyles: CSSProperties = {}
    let buttonTypeStyles: CSSProperties = {}
    const contrastingColor = getContrastingColor(snap.color)

    if (disabled) {
      disabledStyles = {
        cursor: 'not-allowed',
        opacity: 0.3,
      }
    }

    if (type === 'filled') {
      buttonTypeStyles = {
        backgroundColor: snap.color,
        color: contrastingColor,
        borderWidth: '1px',
        borderColor: contrastingColor,
      }
    } else if (type === 'outlined') {
      buttonTypeStyles = {
        borderWidth: '1px',
        borderColor: contrastingColor,
        color: snap.color,
      }
    }

    return {
      ...disabledStyles,
      ...buttonTypeStyles,
    }
  }

  return (
    <button
      type='button'
      disabled={disabled}
      className={`px-2 py-1.2 flex-1 rounded-md font-medium ${customStyles}`}
      style={generateStyle(type)}
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default CustomButton
