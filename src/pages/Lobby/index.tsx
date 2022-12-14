import React from 'react'

interface ILobbyProps {}

const Lobby: React.FC<ILobbyProps> = props => {
    return (
        <div className="h-[calc(100vh_-_90px)] bg-white p-10">
            <div className="flex items-center justify-center">
                <h3 className="text-xl font-semibold">Vui lòng đợi người quản lý bắt đầu ....</h3>
            </div>
            <div className="mt-12 grid animate-pulse grid-cols-2 gap-9">
                <div>
                    <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 "></div>
                    <div className="mb-4 h-2 max-w-[360px] rounded-full bg-gray-200"></div>
                    <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 "></div>
                    <div className="mb-4 h-2 max-w-[360px] rounded-full bg-gray-200"></div>
                    <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 "></div>
                    <div className="mb-4 h-2 max-w-[360px] rounded-full bg-gray-200"></div>{' '}
                    <div className="mb-4 h-2.5 w-48 rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[680px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[440px] rounded-full bg-gray-200 "></div>
                    <div className="mb-2.5 h-2 max-w-[460px] rounded-full bg-gray-200 "></div>
                    <div className="mb-4 h-2 max-w-[360px] rounded-full bg-gray-200"></div>
                </div>
                <div>
                    <div className="h-full w-full rounded bg-gray-100 "></div>
                </div>
            </div>
        </div>
    )
}

export default Lobby
