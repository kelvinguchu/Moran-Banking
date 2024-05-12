'use client'
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount} : {amount: number}) => {
    return (
      <div className='w-full'>
        <CountUp
          decimal='.'
          decimals={2}
          prefix='Ksh.'
          end={amount}
          duration={2}
        />
      </div>
    );
}

export default AnimatedCounter