import React from "react";
import { contrastRatio } from "../utils/contrast";


export default function StylePanel({ config, setConfig }) {
    const update = (patch) => setConfig((c) => ({ ...c, ...patch }));
    const userContrast = contrastRatio(config.userTextColor, config.userBubbleColor);
    const botContrast = contrastRatio(config.botTextColor, config.botBubbleColor);


    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Chat Interface</h2>
                <button className="px-4 py-2 text-sm font-medium text-white bg-gray-500 rounded-md hover:bg-gray-800 transition">
                    Save
                </button>
            </div>

            {/* Tabs */}
            <div className="border-b px-6 flex space-x-6 text-sm">
                <button className="py-3 border-b-2 border-indigo-600 font-medium text-indigo-600">
                    Style
                </button>
                <button className="py-3 text-gray-500 hover:text-gray-700">Content</button>
            </div>

            {/* Panel Body */}
            <div className="p-6 space-y-8 text-sm text-gray-700">
                {/* Appearance */}
                <section>
                    <h3 className="font-medium mb-3">Appearance</h3>
                    <div className="flex gap-4">
                        {/* Light */}
                        <label className="flex flex-col border rounded-lg p-3 cursor-pointer hover:border-indigo-500 w-28">
                            <input
                                type="radio"
                                name="theme"
                                checked={!config.darkMode}
                                onChange={() => update({ darkMode: false })}
                                className="hidden"
                            />
                            <div className="w-full h-16 bg-white border rounded mb-2"></div>
                            <span className="text-xs text-center">Light</span>
                        </label>
                        {/* Dark */}
                        <label className="flex flex-col border rounded-lg p-3 cursor-pointer hover:border-indigo-500 w-28">
                            <input
                                type="radio"
                                name="theme"
                                checked={config.darkMode}
                                onChange={() => update({ darkMode: true })}
                                className="hidden"
                            />
                            <div className="w-full h-16 bg-gray-800 border rounded mb-2"></div>
                            <span className="text-xs text-center">Dark</span>
                        </label>
                    </div>
                </section>

                {/* Branding */}
                <section>
                    <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">Profile picture</p>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                        setConfig((c) => ({ ...c, profilePic: ev.target.result }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="hidden"
                            id="profileUpload"
                        />
                        <label
                            htmlFor="profileUpload"
                            className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
                        >
                            Upload
                        </label>
                    </div>
                    <p className="text-xs text-gray-400 mb-4">Supports JPG, PNG, SVG up to 1MB</p>

                    {config.profilePic && (
                        <div className="mt-2">
                            <img
                                src={config.profilePic}
                                alt="Profile preview"
                                className="w-12 h-12 rounded-full object-cover shadow"
                            />
                        </div>
                    )}

                    <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-700">Chat Icon</p>
                        <input
                            type="file"
                            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onload = (ev) => {
                                        setConfig((c) => ({ ...c, chatIcon: ev.target.result }));
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            className="hidden"
                            id="chatIconUpload"
                        />
                        <label
                            htmlFor="chatIconUpload"
                            className="flex items-center gap-2 border px-3 py-1 rounded-md text-sm text-gray-600 hover:bg-gray-50 cursor-pointer"
                        >
                            Upload
                        </label>
                    </div>
                    <p className="text-xs text-gray-400">Supports JPG, PNG, SVG up to 1MB</p>

                    {config.chatIcon && (
                        <div className="mt-2">
                            <img
                                src={config.chatIcon}
                                alt="Chat Icon preview"
                                className="w-12 h-12 rounded-full object-cover shadow"
                            />
                        </div>
                    )}
                </section>

                {/* Colors */}
                <section>
                    <h3 className="font-medium mb-3">Colors</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span>User Bubble color</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="color"
                                    value={config.userBubbleColor}
                                    onChange={(e) => update({ userBubbleColor: e.target.value })}
                                    className="appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-indigo-600 checked:border-indigo-600 flex items-center justify-center cursor-pointer transition"

                                />

                            </label>

                        </div>
                        {userContrast < 4.5 && (
                            <p className="text-xs text-red-500 mt-1">
                                Low contrast! Text may be hard to read.
                            </p>
                        )}

                        <label className="flex items-center justify-between px-3 py-2 border rounded-md bg-gray-50 cursor-pointer">
                            <span className="text-gray-700 text-sm">Sync user message color with agent header</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.syncUserColor}
                                    onChange={(e) => update({ syncUserColor: e.target.checked })}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-indigo-600 transition-colors"></div>
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-5"></div>
                            </label>


                        </label>

                        <div className="flex items-center justify-between">
                            <span>Bot bubble color</span>
                            <input
                                type="color"
                                value={config.botBubbleColor}
                                onChange={(e) => update({ botBubbleColor: e.target.value })}
                                className="appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-indigo-600 checked:border-indigo-600 flex items-center justify-center cursor-pointer transition"
                            />
                        </div>
                        {botContrast < 4.5 && (
                            <p className="text-xs text-red-500 mt-1">
                                Low contrast! Text may be hard to read.
                            </p>
                        )}

                        <div className="flex items-center justify-between">
                            <span>Header background</span>
                            <input
                                type="color"
                                value={config.headerBg}
                                onChange={(e) => update({ headerBg: e.target.value })}
                                className="appearance-none h-5 w-5 border border-gray-300 rounded-md checked:bg-indigo-600 checked:border-indigo-600 flex items-center justify-center cursor-pointer transition"
                            />
                        </div>
                    </div>
                </section>

                {/* Typography */}
                <section className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-900">Typography</h3>

                    {/* Font Family */}
                    <div>
                        <label className="block text-sm text-gray-600 mb-2">Font family</label>
                        <select
                            value={config.fontFamily}
                            onChange={(e) => update({ fontFamily: e.target.value })}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white shadow-sm 
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                        >
                            <option value="Inter, sans-serif">Inter</option>
                            <option value="Roboto, sans-serif">Roboto</option>
                            <option value="system-ui, sans-serif">System UI</option>
                            <option value="Georgia, serif">Georgia</option>
                        </select>
                    </div>

                    {/* Font Size */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-gray-600">Font size</label>
                            <span className="text-sm font-medium text-gray-800">{config.fontSize}px</span>
                        </div>
                        <input
                            type="range"
                            min="12"
                            max="18"
                            value={config.fontSize}
                            onChange={(e) => update({ fontSize: Number(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600
                                [&::-webkit-slider-thumb]:appearance-none 
                                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
                                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 
                                [&::-webkit-slider-thumb]:shadow-md 
                              [&::-webkit-slider-thumb]:hover:bg-indigo-700 
                                [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 
                                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600"
                        />
                    </div>
                </section>                          



                {/* Layout */}
                <section className="space-y-6">
                    <h3 className="text-sm font-semibold text-gray-900">Layout</h3>

                    {/* Width */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-gray-600">Width</label>
                            <span className="text-sm font-medium text-gray-800">{config.width}px</span>
                        </div>
                        <input
                            type="range"
                            min="280"
                            max="420"
                            value={config.width}
                            onChange={(e) => update({ width: Number(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 
                                [&::-webkit-slider-thumb]:appearance-none 
                                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
                                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 
                                [&::-webkit-slider-thumb]:shadow-md 
                              [&::-webkit-slider-thumb]:hover:bg-indigo-700 
                                [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 
                                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600"
                        />
                    </div>

                    {/* Corner radius */}
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm text-gray-600">Corner radius</label>
                                        <span className="text-sm font-medium text-gray-800">{config.cornerRadius}px</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="24"
                            value={config.cornerRadius}
                            onChange={(e) => update({ cornerRadius: Number(e.target.value) })}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 
                                [&::-webkit-slider-thumb]:appearance-none 
                                [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 
                                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-indigo-600 
                                [&::-webkit-slider-thumb]:shadow-md 
                              [&::-webkit-slider-thumb]:hover:bg-indigo-700 
                                [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 
                                [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-indigo-600"
                        />
                    </div>
                </section>



                {/* Behavior */}
                <section>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={config.showPoweredBy}
                            onChange={(e) => update({ showPoweredBy: e.target.checked })}
                            className="peer hidden"
                        />
                        <span className="h-4 w-4 inline-block border border-gray-400 rounded transition-colors peer-checked:bg-gray-800 peer-checked:border-gray-900"></span>
                        <span className="text-sm text-gray-700">Show "Powered by" line</span>
                    </label>

                </section>
            </div>
        </div>
    );
}
