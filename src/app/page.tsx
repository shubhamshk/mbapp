// page.tsx
"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [user, setUser] = useState<{ username: string; city: string; state: string; totalPoints: number } | null>(null);

    // Simulated fetch for user data
    useEffect(() => {
        const fetchUserData = async () => {
            setLoading(true);
            // Simulate a delay and set user data
            setTimeout(() => {
                setUser({
                    username: "Shubham",
                    city: "patna",
                    state: "Bihar ",
                    totalPoints: 0,
                });
                setLoading(false);
            }, 1000);
        };

        fetchUserData();
    }, []);

    return (
        <section className="p-4 pb-24 flex flex-col gap-4 bg-white text-black"> {/* Light background and black text */}
            {loading ? (
                <div className="flex justify-center items-center min-h-screen">
                    <span className="text-gray-700">Loading...</span> {/* Updated text color for better visibility */}
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    <h1 className="text-xl font-bold">Hi, {user?.username}</h1>
                    <p className="text-gray-700">
                        Location: {user?.state}, {user?.city}
                    </p>
                    <div className="bg-[#404096] p-4 text-white rounded-lg">
                        <h2 className="text-lg">Your Stats: {user?.totalPoints}</h2>
                    </div>

                    {/* Courses Section */}
                    <div className="flex flex-col gap-2">
                        <h2 className="text-lg font-semibold">Courses</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-gray-200 p-4 rounded-lg">Course 1</div>
                            <div className="bg-gray-200 p-4 rounded-lg">Course 2</div>
                            <div className="bg-gray-200 p-4 rounded-lg">Course 3</div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Page;
