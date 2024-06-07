import { RegisterForm } from '@/components/admin/create-account-form'
import React from 'react'

export default function CreateAccountPage() {
    return (
        <div className='flex flex-col items-center justify-between pt-[50px]'>
            <RegisterForm />
        </div>
    )
}
