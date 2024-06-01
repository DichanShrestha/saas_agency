import { auth } from '@/app/api/auth/[...nextauth]/auth'
import { redirect, useRouter } from 'next/navigation';

const googleSignUp = async () => {
    const session = await auth();
    const router = useRouter()
    console.log(session,'google-sign-in');

    if (session?.user) {
        router.replace('/sign-in')
    } else {
        redirect('/')
    }
    
  return ;
}

export default googleSignUp
