"use client";

import React from "react";
import { X, AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
    type?: "danger" | "warning" | "info";
}

export default function ConfirmDialog({
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = "Evet",
    cancelText = "Hayır",
    type = "warning",
}: ConfirmDialogProps) {
    const getTypeStyles = () => {
        switch (type) {
            case "danger":
                return {
                    bg: "bg-red-400",
                    border: "border-red-600",
                    confirmBg: "bg-red-600 hover:bg-red-700",
                };
            case "warning":
                return {
                    bg: "bg-yellow-400",
                    border: "border-yellow-600",
                    confirmBg: "bg-black hover:bg-gray-800",
                };
            case "info":
                return {
                    bg: "bg-blue-400",
                    border: "border-blue-600",
                    confirmBg: "bg-blue-600 hover:bg-blue-700",
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div
                className={`relative w-full max-w-lg ${styles.bg} border-8 ${styles.border} shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in duration-200`}
            >
                {/* Close Button */}
                <button
                    onClick={onCancel}
                    className="absolute top-4 right-4 p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border-2 border-black"
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="p-8 pt-12">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-black border-4 border-black">
                            <AlertTriangle size={48} className="text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-center text-black font-black text-2xl uppercase tracking-tight leading-tight mb-4">
                        {title}
                    </h2>

                    {/* Message */}
                    <p className="text-center text-black font-bold text-base mb-8 leading-relaxed">
                        {message}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={onConfirm}
                            className={`flex-1 px-6 py-4 ${styles.confirmBg} text-white font-bold uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all`}
                        >
                            {confirmText}
                        </button>
                        <button
                            onClick={onCancel}
                            className="flex-1 px-6 py-4 bg-white text-black font-bold uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                        >
                            {cancelText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
