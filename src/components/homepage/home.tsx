'use client';

import React from 'react';

import Link from 'next/link';

type Props = {};

const HomePage: React.FC<Props> = ({}) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="w-1/5 bg-white shadow-lg">
                <div className="flex flex-col p-6">
                    <div className="mb-10">
                        <img
                            src="/path-to-your-logo.png" // replace with your logo path
                            className="w-full"
                        />
                        <h1 className="text-xl font-bold mt-4">KSF </h1>
                        <p className="text-sm">Kaset fair selection</p>
                    </div>
                    <nav className="flex flex-col gap-4">
                        <a href="#" className="text-primary hover:text-green-800 font-semibold">หน้าหลัก</a>
                        <a href="#" className="text-primary hover:text-green-800 font-semibold">ประกาศ</a>
                    </nav>
                </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="bg-primary  text-white p-4 flex justify-between items-center">
                    <h2 className="text-lg">หน้าหลัก</h2>
                    <Link href="/sign-in" className=" text-black font-semibold py-2 px-4 rounded hover:bg-green-800">
                        <p className=' text-white'>
                            ลงชื่อเข้าใช้
                        </p>
                    </Link>
                </header>
                <main className="flex-1 p-10 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-gray-500">ไม่มีข้อมูล ณ ขณะนี้</p>
                    </div>
                </main>
                <footer className="bg-white text-gray-500 p-4 text-center text-sm">
                    <p>สงวนลิขสิทธิ์ © 2024 กองพัฒนานิสิต มหาวิทยาลัยเกษตรศาสตร์</p>
                    <p>อัปเดตล่าสุด : 04/06/2024 01:33</p>
                    <div className="flex justify-center space-x-2">
                        <a href="#" className="hover:underline">นโยบายคุ้มครองข้อมูล</a>
                        <a href="#" className="hover:underline">เว็บไซต์</a>
                        <a href="#" className="hover:underline">ติดต่อเรา</a>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default HomePage;
