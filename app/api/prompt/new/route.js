import { connectToDB } from "@utils/db";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";

export const POST = async (req) => {
    const {userId, prompt, tag } = await req.json();

    try {
        await connectToDB();
        const newPrompt = Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new NextResponse(JSON.stringify(newPrompt), {status: 201});
    } catch (error) {
        return new NextResponse('Failed to create a new prompt', { status: 500 })
    }
}