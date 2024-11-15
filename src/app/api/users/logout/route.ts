/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from '@/dbConfig/dbConfig';
import {NextRequest,NextResponse} from 'next/server'

connect()

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: 'Logout Successfully',
            success:true
        })

        response.cookies.set('token','',{
            httpOnly: true,
            expires: new Date(0)
        })

        return response;
    } catch (error:any) {
        return NextResponse.json({error: error.message},
        {status: 500}); 
    }
}