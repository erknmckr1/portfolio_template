"use client";

import { useEffect, useState } from "react";
import { incrementView } from "./actions";
import { Eye } from "lucide-react";

interface ViewCounterProps {
    postId: string;
    initialViews: number;
    showIcon?: boolean;
    increment?: boolean;
}

export default function ViewCounter({ postId, initialViews, showIcon = true, increment = true }: ViewCounterProps) {
    const [views, setViews] = useState(initialViews);

    useEffect(() => {
        if (increment) {
            incrementView(postId);
            setViews((prev) => prev + 1);
        }
    }, [postId, increment]);

    return (
        <span className="flex items-center gap-1.5" title={`${views} görüntülenme`}>
            {showIcon && <Eye size={16} className="text-gray-400" />}
            {views.toLocaleString("tr-TR")}
        </span>
    );
}
