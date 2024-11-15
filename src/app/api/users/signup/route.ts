/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest,NextResponse} from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer';



export async function POST(request: NextRequest) {
    connect()
    try {
        const reqBody = await request.json()
        const {username, email, password}=reqBody
        // validation
        console.log(reqBody);

        if(!username || !email || !password){
            return NextResponse.json({error: 'Please fill in all fields'}, {status: 400})
        }
        
        const user = await User.findOne({email});

        if(user){
            return NextResponse.json({error: 'User already exists'}, {status: 400})
        }

        const salt = await bcryptjs.genSalt(10);  
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })


        const savedUser = await newUser.save()
        console.log(savedUser);
        
        //send verifictaion email
        await sendEmail({email, emailType:"VERIFY", userId: savedUser._id})

        return NextResponse.json({
            message: 'User created successfully',
            success: true,
            savedUser
        })
    } catch (error:any) {
        return NextResponse.json({error: error.message},
        {status: 500});
    }
}