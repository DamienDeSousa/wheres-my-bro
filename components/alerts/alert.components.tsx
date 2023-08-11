'use client'

import { useState } from 'react'

interface IAlert {
  importantText?: string
  text?: string
}

export const Alert = (params: IAlert) => {
  const { importantText, text } = params
  const [isDisplayed, setIsDisplayed] = useState<boolean>(true)
  return (
    <>
      {isDisplayed && (
        <div
          className="flex items-center p-4 mb-4 text-sm text-blue-800 border border-blue-300 rounded-lg bg-blue-50"
          role="alert"
        >
          <span className="sr-only">Info</span>
          <div className="flex flex-col gap-2">
            {importantText && <span className="block font-bold">{importantText}</span>}
            {text && <span className="block">{text}</span>}
          </div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700"
            data-dismiss-target="#alert-1"
            aria-label="Close"
            onClick={() => setIsDisplayed(false)}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
