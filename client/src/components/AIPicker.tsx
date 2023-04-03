import { FC, ReactElement, useState } from 'react'
import { useSnapshot } from 'valtio'
import { getContrastingColor } from '../config/helpers'
import state from '../store'
import CustomButton from './CustomButton'

type AIPickerProps = {
  base64Image: string | undefined
  onImageGenerated?: (base64?: string) => void
  footer?: ReactElement
}
const AIPicker: FC<AIPickerProps> = ({
  base64Image,
  footer,
  onImageGenerated,
}) => {
  const snap = useSnapshot(state)
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGeneratingImg] = useState(false)
  const contrastingColor = getContrastingColor(snap.color)

  const onSubmit = async () => {
    if (!prompt) {
      return alert('Please enter the prompt')
    }
    try {
      setGeneratingImg(true)
      const url = 'http://localhost:8080/api/v1/dalle'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
        }),
      })

      const data = await response.json()
      if (!data.photo) {
        alert('Something went wrong')
        return
      }

      console.log({ data })
      const base64 = `data:image/png;base64,${data.photo}`

      onImageGenerated?.(base64)
    } catch (error) {
      alert(error)
    } finally {
      setGeneratingImg(false)
    }
  }
  return (
    <div className='aipicker-container flex flex-col gap-5'>
      {!base64Image ? (
        <>
          <textarea
            placeholder='Ask AI...'
            rows={5}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className='aipicker-textarea rounded-md'
            style={{
              borderWidth: 1,
              borderColor: contrastingColor,
              color: contrastingColor,
            }}
          />
          <CustomButton
            type='filled'
            disabled={generatingImg}
            title={generatingImg ? 'Asking AI...' : 'Ask AI'}
            customStyles='text-xs h-[40px]'
            onClick={onSubmit}
          />
        </>
      ) : (
        <>
          <img src={base64Image} alt='Generated Image' />
          {footer && <div className='mt-4'>{footer}</div>}
          <div
            onClick={() => onImageGenerated?.()}
            className='text-xs cursor-pointer text-center'
          >
            Ask again
          </div>
        </>
      )}
    </div>
  )
}

export default AIPicker
