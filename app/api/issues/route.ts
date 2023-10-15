import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../createIssueSchema";

export async function POST(request:NextRequest) {
    const body = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if (!validation.success) {
        return NextResponse.json(validation.error.format(),{status:400})
    }
    const newIssue = await prisma.issue.create({
        data: { title: body.title, desc: body.desc }
    });

    return NextResponse.json(newIssue, { status: 201})
}

export async function GET(res: NextResponse) {
    
    const allData = await prisma.issue.findMany();

    return NextResponse.json(allData, { status: 200})
}
