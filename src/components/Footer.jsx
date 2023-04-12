import { BsGithub, BsLinkedin } from "react-icons/bs"

export const Footer = () => {

  return (
    <div className="fixed-bottom d-flex justify-content-end align-items-center py-3 px-5 bg-black text-light">
        <a className="text-decoration-none" href="https://github.com/ferOlguiin?tab=repositories" rel="noreferrer" target="_blank"><BsGithub className="text-light fs-4 me-2"/></a>
        <a className="text-decoration-none" href="https://www.linkedin.com/in/fernando-olguin-5a63a9236/" rel="noreferrer" target="_blank"><BsLinkedin className="text-primary fs-4"/></a>
    </div>
  )
}
