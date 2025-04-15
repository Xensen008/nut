import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import Lookups from '@/data/Lookups'
import { Button } from '../ui/button'
import { FcGoogle } from 'react-icons/fc'
import { useGoogleLogin } from '@react-oauth/google'
import { UserDetailContext } from '@/context/UserDetailContext'
import axios from 'axios'
import { useMutation } from 'convex/react'
import uuid4 from 'uuid4'
import { api } from '@/convex/_generated/api'




function SignInDialog({ openDialog, closeDialog }) {
    const { userDetail, setUserDetail } = useContext(UserDetailContext)
    const CreateUser= useMutation(api.users.CreateUser)
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            console.log(tokenResponse);
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: 'Bearer ' + tokenResponse?.access_token } },
            );

            console.log(userInfo);
            const user = userInfo.data;

            await CreateUser({
                name: user?.name,    
                email: user?.email,
                picture: user?.picture,
                uid: uuid4()
            })

            if(typeof window !== 'undefined') {
                localStorage.setItem('user', JSON.stringify(user))
            }

            setUserDetail(userInfo?.data);

            closeDialog(false); 
        },
        onError: errorResponse => console.log(errorResponse),
    });


    return (
        <Dialog open={openDialog} onOpenChange={closeDialog}>
            <DialogContent className="sm:max-w-md border border-gray-800 bg-gray-950/90 backdrop-blur-md shadow-xl rounded-xl overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 to-gray-700"></div>

                <DialogHeader className="space-y-3 pb-4">
                    {/* Icon */}
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-900 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                        </svg>
                    </div>

                    <DialogTitle className="text-center text-xl font-bold tracking-tight">
                        {Lookups.SIGNIN_HEADING}
                    </DialogTitle>

                    <div className="text-center text-sm text-gray-400 px-6">
                        {Lookups.SIGNIN_SUBHEADING}
                    </div>
                </DialogHeader>

                <div className="flex flex-col items-center justify-center gap-4 py-2">
                    <Button onClick={googleLogin} className="bg-gray-900 hover:bg-gray-800 text-white border border-gray-700 w-full h-11 flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg">
                        <FcGoogle className="h-5 w-5" />
                        <span className="font-medium">Sign in with Google</span>
                    </Button>
                </div>

                <DialogFooter className="flex justify-center items-center mt-4 pt-3 border-t border-gray-800">
                    <span className="text-xs text-center text-gray-500 max-w-xs mx-auto">
                        {Lookups.SIGNIn_AGREEMENT_TEXT}
                    </span>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialog