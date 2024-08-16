'use client'
import CustomEditor from '@/components/CustomEditor'
import dynamic from "next/dynamic"

// const CustomEditor = dynamic(() => import('@/components/CustomEditor'), {ssr: false})

const Crate = () => {
      return (
            <CustomEditor/>
      )
};

export default Crate;