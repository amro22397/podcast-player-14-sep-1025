'use client'

import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Input } from './ui/input';
import Image from 'next/image';

const Searchbar = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (search) {
            router.push(`/discover?search=${search}`)
        } else if (!search && pathname === '/discover')
            router.push('/discover')
    }, [router, pathname]);


  return (
    <div className='relative mt-8 block'>
      <Input />
      <Image
      src='icons/search.svg'
      alt='search'
      height={20}
      width={20}
      className='absolute left-4 top-3.5'
       />
    </div>
  )
}

export default Searchbar
