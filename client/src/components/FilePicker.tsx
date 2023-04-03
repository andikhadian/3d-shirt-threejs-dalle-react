import { color } from 'framer-motion'
import { FC, ReactElement } from 'react'
import { useSnapshot } from 'valtio'

import { getContrastingColor, reader } from '../config/helpers'
import state from '../store'

type FilePickerProps = {
  file: File | undefined
  footer?: ReactElement
  onChange?: (file: File, base64: string) => void
}
const FilePicker: FC<FilePickerProps> = ({ file, footer, onChange }) => {
  const snap = useSnapshot(state)
  const contrastingColor = getContrastingColor(snap.color)

  const onReadFile = (newFile: File | undefined) => {
    if (!newFile) return

    reader(newFile).then((base64) => {
      console.log({ base64, type: typeof base64 })
      onChange?.(newFile, base64 as string)
    })
  }

  return (
    <div className='filepicker-container'>
      <div className='flex flex-1 flex-col'>
        <label
          htmlFor='dropzone-file'
          style={{
            borderStyle: 'dashed',
            borderColor: contrastingColor,
            borderWidth: 1,
          }}
          className='flex flex-col items-center justify-center w-full h-24 rounded-md cursor-pointer bg-transparent'
        >
          <div className='flex flex-col items-center justify-center px-2'>
            <svg
              aria-hidden='true'
              style={{ color: contrastingColor }}
              className='w-5 h-5 mb-3'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
              ></path>
            </svg>
            <p
              style={{ color: contrastingColor }}
              className='mb-2 text-xs text-center'
            >
              <span className='font-semibold'>Click to upload</span> or drag and
              drop
            </p>
          </div>
          <input
            id='dropzone-file'
            type='file'
            className='hidden'
            accept='image/*'
            onChange={(e) => onReadFile(e.target.files?.[0])}
          />
        </label>

        <p
          style={{ color: contrastingColor }}
          className='mt-2 text-xs truncate'
        >
          {file?.name ?? 'No file selected'}
        </p>
      </div>

      {footer && <div className='mt-4'>{footer}</div>}
    </div>
  )
}

export default FilePicker
