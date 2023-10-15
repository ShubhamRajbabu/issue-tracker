import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request:NextRequest) {
    const { pathname } = new URL(request.url)
    const pathArr = pathname.split('/')
    const id = +pathArr[pathArr.length - 1]

     await prisma.issue.delete({where:{id:id}});

    return NextResponse.json({message:'Item deleted successfully'}, { status: 200})
    
}