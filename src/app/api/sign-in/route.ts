import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'

export async function POST(request: NextRequest) {
  await dbConnect();
  try {
    const { email, username, password } = await request.json();
    if (!email && !username) {
      return NextResponse.json(
        { message: "email or username us required", success: false },
        { status: 400 }
      );
    }
    if (!password) {
      return NextResponse.json(
        { message: "password is required", success: false },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne(
        {$or: [{email}, {username}]},
    )

    if (!user) {
        return NextResponse.json(
            { message: "username or email is incorrect", success: false },
            { status: 401 }
          );
    }
    if (!user.isVerified) {
        return NextResponse.json(
            { message: "Please verify your account", success: false },
            { status: 403 }
          );
    }
    const isPasswordCorrect = await bcryptjs.compare(password, user.password)

    if (!isPasswordCorrect) {
        return NextResponse.json(
            { message: "Incorrect password", success: false },
            { status: 401 }
          );
    }
    user.isLoggedIn = true;
    await user.save()
    const { password: _, ...userWithoutPassword } = user.toObject();

    return NextResponse.json(
        { message: "User signed in successfully", success: true, data: userWithoutPassword },
        { status: 200 }
      );

  } catch (error) {
    return NextResponse.json(
        { message: "Error while signing up", success: false },
        { status: 500 }
      );
  }
}
