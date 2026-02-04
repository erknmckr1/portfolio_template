"use client";

import React from "react";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";

interface NotificationModalProps {
    message: string;
    type: "success" | "error" | "warning" | "info";
    onClose: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}

export default function NotificationModal({
    message,
    type,
    onClose,
    onConfirm,
    confirmText = "Tamam",
    cancelText = "İptal",
}: NotificationModalProps) {
    const getTypeStyles = () => {
        switch (type) {
            case "success":
                return {
                    bg: "bg-green-400",
                    border: "border-green-600",
                    icon: <CheckCircle size={48} className="text-green-800" />,
                };
            case "error":
                return {
                    bg: "bg-red-400",
                    border: "border-red-600",
                    icon: <AlertCircle size={48} className="text-red-800" />,
                };
            case "warning":
                return {
                    bg: "bg-yellow-400",
                    border: "border-yellow-600",
                    icon: <AlertTriangle size={48} className="text-yellow-800" />,
                };
            case "info":
                return {
                    bg: "bg-blue-400",
                    border: "border-blue-600",
                    icon: <Info size={48} className="text-blue-800" />,
                };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
            <div
                className={`relative w-full max-w-md ${styles.bg} border-8 ${styles.border} shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] animate-in fade-in zoom-in duration-200`}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 bg-black text-white hover:bg-white hover:text-black transition-colors border-2 border-black"
                >
                    <X size={20} />
                </button>

                {/* Content */}
                <div className="p-8 pt-12">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">{styles.icon}</div>

                    {/* Message */}
                    <p className="text-center text-black font-black text-xl uppercase tracking-tight leading-tight mb-8">
                        {message}
                    </p>

                    {/* Actions */}
                    <div className="flex gap-4">
                        {onConfirm ? (
                            <>
                                <button
                                    onClick={onConfirm}
                                    className="flex-1 px-6 py-4 bg-black text-white font-bold uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                >
                                    {confirmText}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="flex-1 px-6 py-4 bg-white text-black font-bold uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                >
                                    {cancelText}
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={onClose}
                                className="w-full px-6 py-4 bg-black text-white font-bold uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                            >
                                {confirmText}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}