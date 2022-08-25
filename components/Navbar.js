import Link from "next/link";

export default function Example() {
  return (
    <>
      <nav className="flex items-center flex-wrap bg-blue-700 p-2 ">
        <a className="inline-flex items-center p-2 mr-4 ">
          <div className="text-2xl text-white font-bold uppercase tracking-wide">
            Example
          </div>
        </a>
        <div className="hidden w-full lg:inline-flex lg:flex-grow lg:w-auto">
          <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
            <Link href="/">
              <a
                className={
                  "lg:inline-flex lg:w-auto w-full px-4 py-2 rounded text-lg text-white font-bold items-center justify-center hover:bg-blue-500 hover:text-white "
                }
              >
                หน้าหลัก
              </a>
            </Link>

            <Link href="/">
              <a
                className={
                  "lg:inline-flex lg:w-auto w-full px-4 py-2 rounded text-lg text-white font-bold items-center justify-center hover:bg-blue-500 hover:text-white "
                }
              >
                Blog
              </a>
            </Link>
            <Link href="/">
              <a
                className={
                  "lg:inline-flex lg:w-auto w-full px-4 py-2 rounded text-lg text-white font-bold items-center justify-center hover:bg-blue-500 hover:text-white"
                }
              >
                ช่วยเหลือ
              </a>
            </Link>
            <Link href="/">
              <a
                className={
                  "lg:inline-flex lg:w-auto w-full px-4 py-2 mr-4 rounded text-lg text-white font-bold items-center justify-center hover:bg-blue-500 hover:text-white"
                }
              >
                ติดต่อเรา
              </a>
            </Link>
            |
            <span className="ml-4">
              <Link href={"/"} passHref>
                <a
                  className={
                    "lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-lg text-white font-bold items-center justify-center hover:bg-green-500 hover:text-white"
                  }
                >
                  Setting
                </a>
              </Link>
            </span>

            <span className="">
              <Link href={"/"} passHref>
                <a className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-lg text-white font-bold items-center justify-center hover:bg-red-600 hover:text-white">
                  LogOut
                </a>
              </Link>
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
