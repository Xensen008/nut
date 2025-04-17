import { ChatSession } from "@/configs/AiModel";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { prompt } = await req.json();
        const result = await ChatSession.sendMessage(prompt);
        const AIresponse = result.response.text();

        return NextResponse.json({
            result: AIresponse
        });
    } catch (error) {
        console.error('AI Chat Error:', error);
        return NextResponse.json(
            { error: error.message || 'Failed to process request' },
            { status: 500 }
        );
    }
}