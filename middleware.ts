import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// User authentication
const userAuth = Buffer.from(process.env.USER_AUTH || '').toString('base64')
// Admin authentication
const adminAuth = Buffer.from(process.env.ADMIN_AUTH || '').toString('base64')

export function middleware(request: NextRequest) {
	const url = request.nextUrl
	const path = url.pathname
	const authHeader = request.headers.get('authorization')
	if(authHeader === (path.startsWith('/admin') ? `Basic ${adminAuth}` : `Basic ${userAuth}`)){
		return NextResponse.next()
	}
	return new NextResponse('401 Unauthorized', {
		status: 401,
		headers: {
			'WWW-Authenticate': 'Basic realm="Secure Area"',
		},
	})
	return NextResponse.next()
}

// Set the paths for authorisation
export const config = {
	matcher: ['/', '/survey/:path*', '/admin/:path*'],
}
