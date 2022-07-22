import * as React from "react"

function Logo(props: any) {
  return (
    <svg
      className="logo"
      width={68}
      height={68}
      viewBox="0 0 68 68"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M34 57.917l30.75 6.833L34 3.25 3.25 64.75 34 57.917zm0 0V30.583"
        stroke="#3B82F6"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Logo;
