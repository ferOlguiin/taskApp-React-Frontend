import { BsGithub, BsLinkedin } from "react-icons/bs"

export const Footer = () => {
  return (
    <div className="fixed-bottom d-flex justify-content-end align-items-center py-3 px-5 bg-black text-light">
        <span><BsGithub className="fs-4 me-2"/></span>
        <span><BsLinkedin className="text-primary fs-4"/></span>
    </div>
  )
}
