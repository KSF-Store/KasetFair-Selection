import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="z-10 flex flex-col gap-5 rounded-2xl border border-neutral-400 bg-white bg-opacity-70 py-10 backdrop-blur-sm md:px-16">
        <div className="flex items-center justify-center gap-4">
          <Image className="h-16 w-16" src="/assets/KULogo.svg" alt="KU Logo" width={64} height={64}/>
          <div className="flex flex-col justify-around">
            <div className="flex gap-3">
              <span className="text-4xl font-bold leading-10 text-primary">SD</span>
              <span className="text-4xl font-bold leading-10 text-black">Online</span>
            </div>
            <div className="flex font-medium text-neutral-700">Kaset Fair Selection</div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <button className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg bg-secondary px-3.5 py-1 shadow hover:bg-secondary/90">
            <div className="flex items-center gap-2 font-bold  leading-snug text-white">
              <div className="h-fit rounded-full bg-white p-1">
                <Image src="/assets/google_logo.svg" alt="Google Logo" width={16} height={16}/>
              </div>
              <div>เข้าสู่ระบบด้วย Google @ku.th</div>
            </div>
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center pb-5 text-white">
        <div className="flex gap-2">
            <a href="https://sa.ku.ac.th/website-policy/" target="_blank">นโยบายคุ้มครองข้อมูล</a>
            <div>●</div>
            <a href="https://sa.ku.ac.th/" target="_blank">เว็บไซต์</a>
            <div>●</div>
            <a href="mailto:saku@ku.th">ติดต่อเรา</a>
        </div>
        <div className="flex flex-col items-center">
            <div className="font-normal">สงวนลิขสิทธิ์ © 2024 กองพัฒนานิสิต มหาวิทยาลัยเกษตรศาสตร์ </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-0">
        <Image src="/assets/green_wave.svg" className="w-full" alt="green wave background" width={1920} height={1080}/>
      </div>
      <div className="fixed top-[4rem] z-0 flex justify-center">
        <Image src="/assets/sign_in_element.svg" className="w-[60rem]" alt="sign in element" width={1920} height={1080}/>
      </div>
    </div>
  )
}
